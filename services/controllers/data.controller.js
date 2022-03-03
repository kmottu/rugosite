const db = require("../models");
const User = db.user;
const Mesure = db.mesure;
const Rugosite = db.rugosite;
const Organisme = db.organisme;
const Transformation = db.transformation;

// TODO - Check duplicat entries!

exports.postMesure = (req, res) => {
  const mesure = new Mesure({
    name: req.body.name,
  });

  mesure.save((err, mesure) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    return res.status(200).json(mesure);
  });
}

exports.getMesure = async (req, res) => {
  const mesures = await Mesure.find({}).exec();

  if (!mesures)
    return res.status(400).json({ message: "Data not found!" })
  
  return res.status(200).json(mesures);
}

exports.deleteMesure = async (req, res) => {
  const mesure = await Mesure.findByIdAndDelete(req.params.id).exec();

  if (!mesure)
    return res.status(400).json({ message: "Data not found!" })
  
  return res.status(200).json(mesure);
}

exports.postOrganisme = (req, res) => {
  const organisme = new Organisme({
    nom: req.body.nom,
    adresse: req.body.adresse,
    localisation: req.body.localisation,
  });

  organisme.save((err, org) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    return res.status(200).json(org);
  });
}

exports.getOrganisme = async (req, res) => {
  const organismes = await Organisme.find({}).exec();

  if (!organismes)
    return res.status(400).json({ message: "Data not found!" })
  
  return res.status(200).json(organismes);
}

exports.deleteOrganisme = async (req, res) => {
  const org = await Organisme.findByIdAndDelete(req.params.id).exec();

  if (!org)
    return res.status(400).json({ message: "Data not found!" })
  
  return res.status(200).json(org);
}

exports.getUtilisateur = async (req, res) => {
  const utilisateurs = await User.find({}).populate('organisme').populate({ path: "roles", model: "Role" }).exec();

  if (!utilisateurs)
    return res.status(400).json({ message: "Data not found!" })
  
  return res.status(200).json(utilisateurs);
}

exports.deleteUtilisateur = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id).exec();

  if (!user)
    return res.status(400).json({ message: "Data not found!" })
  
  return res.status(200).json(user);
}

exports.postTransformation = (req, res) => {
  const transformation = new Transformation({
    nbrLine: req.body.nbrLine,
    nbrColonne: req.body.nbrColonne,
    binaryInf: req.body.binaryInf,
  });

  transformation.save((err, transformation) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    return res.status(200).json(transformation);
  });
}

exports.getTransformation = async (req, res) => {
  const transformations = await Transformation.find({}).exec();

  if (!transformations)
    return res.status(400).json({ message: "Data not found!" })
  
  return res.status(200).json(transformations);
}

exports.deleteTransformation = async (req, res) => {
  const transformation = await Transformation.findByIdAndDelete(req.params.id).exec();

  if (!transformation)
    return res.status(400).json({ message: "Data not found!" })
  
  return res.status(200).json(transformation);
}

exports.postRugosite = async (req, res) => {
  const mesure = await Mesure.findById(req.body.mesure);
  if (!mesure) {
    return res.status(404).json({ message: "Mesure is not found in DB." });
  }

  // const utilisateur = await Utilisateur.findById(req.body.utilisateur_id);
  // if (!utilisateur) {
  //   return res.status(404).json({ message: "Utilisateur is not found in DB." });
  // }

  const transformation = await Transformation.create({
    nbrLine: req.body.nbrLine,
    nbrColonne: req.body.nbrColonne,
    binaryInf:  req.body.binaryInf,
  });

  const rugosite = new Rugosite({
    nomFichier: req.body.nomFichier,
    localisationDisk: req.body.localisationDisk,
    mesure: [mesure._id],
    valeur: req.body.valeur,
    tags: req.body.tags,
    utilisateur: [],
    transformation: [transformation._id],
  })

  rugosite.save((err, rug) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    return res.status(200).json(rug);
  })
}

exports.getRugosite = async (req, res) => {
  const rugosite = await Rugosite.find({}).populate('mesure transformation').populate({ path: "utilisateur", model: "User", populate: { path: "organisme", model: "Organisme"}}).exec();

  if (!rugosite)
    return res.status(400).json({ message: "Data not found!" })
  
  return res.status(200).json(rugosite);
}

exports.deleteRugosite = async (req, res) => {
  const rugosite = await Rugosite.findByIdAndDelete(req.params.id).exec();

  if (!rugosite)
    return res.status(400).json({ message: "Data not found!" })
  
  return res.status(200).json(rugosite);
}
