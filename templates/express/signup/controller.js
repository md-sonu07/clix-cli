const __MODULE__Controller = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  return res.json({
    message: "__MODULE__ signup successful",
    user: { email }
  });
};

module.exports = { __MODULE__Controller };
