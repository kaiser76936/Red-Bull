import os
from flask import Blueprint, request, jsonify, abort, current_app, url_for
from .models import Edicao, Consumo
from . import db
from werkzeug.utils import secure_filename

bp = Blueprint('api', __name__)

@bp.route('/edicoes', methods=['GET'])
def listar_edicoes():
    edicoes = Edicao.query.order_by(Edicao.name.asc()).all()
    output = []

    for e in edicoes:
        data = e.to_dict()
        consumos = [c.to_dict() for c in e.consumos]
        data['consumos'] = consumos
        data['total_consumos'] = sum(c['number_of_cans'] for c in consumos)
        output.append(data)
    return jsonify(output), 200

@bp.route('/edicoes', methods=['POST'])
def criar_edicao():
    if 'image' in request.files:
        form = request.form
        name = form.get('name')

        if not name:
            abort(400, description="O campo 'name' é obrigatório.")
        description = form.get('description')
        flavors = form.get('flavors')
        image = request.files['image']

        upload_folder = os.path.join(current_app.static_folder, 'uploads')
        os.makedirs(upload_folder, exist_ok=True)
        filename = secure_filename(image.filename)
        filepath = os.path.join(upload_folder, filename)
        image.save(filepath)

        image_url = url_for('static', filename=f'uploads/{filename}')
        e = Edicao(name=name, description=description, flavors=flavors, image_url=image_url)
    else:
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()
        if not data.get('name'):
            abort(400, description="O campo 'name' é obrigatório.")
        e = Edicao(**data)
    db.session.add(e)
    db.session.commit()
    return jsonify(e.to_dict()), 201

@bp.route('/edicoes/<int:id>', methods=['GET'])
def get_edicao(id):
    e = Edicao.query.get_or_404(id)
    consumos = [c.to_dict() for c in e.consumos]
    result = e.to_dict()
    result["consumos"] = consumos
    result["total_consumos"] = sum(c['number_of_cans'] for c in consumos)
    return jsonify(result), 200

@bp.route('/edicoes/<int:id>', methods=['PUT', 'POST']) 
def update_edicao(id):
    e = Edicao.query.get_or_404(id)

    if 'image' in request.files:
        form = request.form

        if form.get('name'):
            e.name = form.get('name')
        if form.get('description') is not None:
            e.description = form.get('description')
        if form.get('flavors') is not None:
            e.flavors = form.get('flavors')

        image = request.files['image']
        upload_folder = os.path.join(current_app.static_folder, 'uploads')
        os.makedirs(upload_folder, exist_ok=True)
        filename = secure_filename(image.filename)
        filepath = os.path.join(upload_folder, filename)
        image.save(filepath)
        e.image_url = url_for('static', filename=f'uploads/{filename}')
    else:
        data = request.get_json(silent=True) or {}
        for key in ['name', 'description', 'flavors']:
            if key in data:
                setattr(e, key, data[key])
    db.session.commit()
    return jsonify(e.to_dict()), 200

@bp.route('/edicoes/<int:id>', methods=['DELETE'])
def delete_edicao(id):
    e = Edicao.query.get_or_404(id)
    db.session.delete(e)
    db.session.commit()
    return '', 204

@bp.route('/edicoes/<int:id>/consumos', methods=['POST', 'PUT', 'PATCH'])
def registrar_ou_atualizar_consumo(id):
    edicao = Edicao.query.get_or_404(id)
    data = request.get_json()

    if data.get('number_of_cans', 0) <= 0:
        abort(400, description="'number_of_cans' deve ser maior que zero.")

    consumo = Consumo.query.filter_by(edicao_id=id).first()
    if consumo:
        consumo.number_of_cans = data['number_of_cans']
    else:
        consumo = Consumo(edicao_id=id, number_of_cans=data['number_of_cans'])
        db.session.add(consumo)

    db.session.commit()
    return jsonify(consumo.to_dict()), 200
