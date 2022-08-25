const jwt = require("jsonwebtoken");
const Invigilator = require("../models/invigilators");
const Evaluator = require("../models/evaluators");

const getAuthenticatedInvigilator = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await Invigilator.findById(decoded._id);

  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
};

const authInvigilator = async (req, res, next) => {
  try {
    const Authorization = req.query.token;
    if (!Authorization) {
      return res
        .status(401)
        .send({ success: false, error: "Auth-key Not found" });
    }
    // const token = Authorization.replace("Bearer ", "");
    req.token = Authorization;
    req.user = await getAuthenticatedInvigilator(Authorization);
    next();
    return;
  } catch (e) {
    return res.status(401).send({
      status: false,
      error: "Please authenticate",
      message: e.message,
    });
  }
};

const getAuthenticatedEvaluator = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await Evaluator.findById(decoded._id);

  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
};

const authEvaluator = async (req, res, next) => {
  try {
    const Authorization = req.query.token;
    if (!Authorization) {
      return res
        .status(401)
        .send({ success: false, error: "Auth-key Not found" });
    }
    // const token = Authorization.replace("Bearer ", "");
    req.token = Authorization;
    req.user = await getAuthenticatedEvaluator(Authorization);
    next();
    return;
  } catch (e) {
    return res.status(401).send({
      status: false,
      error: "Please authenticate",
      message: e.message,
    });
  }
};

module.exports = {
  authInvigilator,
  authEvaluator,
};
