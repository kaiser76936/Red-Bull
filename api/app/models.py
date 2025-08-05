from . import db

class Edicao(db.Model):
    __tablename__ = 'edicoes'
    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    flavors     = db.Column(db.String(255))
    image_url   = db.Column(db.String(255))
    consumos    = db.relationship('Consumo', backref='edicao', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "flavors": self.flavors,
            "image_url": self.image_url
        }

class Consumo(db.Model):
    __tablename__ = 'consumos'
    id             = db.Column(db.Integer, primary_key=True)
    edicao_id      = db.Column(db.Integer, db.ForeignKey('edicoes.id'), nullable=False)
    number_of_cans = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "edicao_id": self.edicao_id,
            "number_of_cans": self.number_of_cans
        }
