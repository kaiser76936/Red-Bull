from flask import Blueprint, request, jsonify, abort
from .models import Edicao, Consumo
from . import db

bp = Blueprint('api', __name__)

@bp.route('/edicoes', methods=['GET'])
def listar_edicoes():
    edicoes = Edicao.query.all()
    return jsonify([e.to_dict() for e in edicoes]), 200

@bp.route('/edicoes', methods=['POST'])
def criar_edicao():
    data = request.get_json()
    if not data.get('name'):
        abort(400, description="O campo 'name' é obrigatório.")
    e = Edicao(**data)
    db.session.add(e)
    db.session.commit()
    return jsonify(e.to_dict()), 201

@bp.route('/edicoes/<int:id>', methods=['GET'])
def get_edicao(id):
    e = Edicao.query.get_or_404(id)
    result = e.to_dict()
    result["consumos"] = [c.to_dict() for c in e.consumos]
    return jsonify(result), 200

@bp.route('/edicoes/<int:id>', methods=['PUT'])
def update_edicao(id):
    e = Edicao.query.get_or_404(id)
    data = request.get_json()
    for key in ['name','description','flavors','image_url']:
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

@bp.route('/edicoes/<int:id>/consumos', methods=['POST'])
def registrar_consumo(id):
    Edicao.query.get_or_404(id)
    data = request.get_json()
    if data.get('number_of_cans', 0) <= 0:
        abort(400, description="'number_of_cans' deve ser maior que zero.")
    c = Consumo(edicao_id=id, number_of_cans=data['number_of_cans'])
    db.session.add(c)
    db.session.commit()
    return jsonify(c.to_dict()), 201
