const express = require(`express`);
const uuid = require(`uuid`);
const router = express.Router();
const members = require(`../../Members`);

//gets all members
router.get(`/`, (req, res) => res.json(members));

//gets single member
router.get(`/:id`, (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No person with the id of ${req.params.id}` });
  }
});

// create member
router.post(`/`, (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  };
  if (
    !newMember.name ||
    !newMember.email ||
    !newMember.gender ||
    !newMember.status
  ) {
    res
      .status(400)
      .json({ msg: `Please include name,email,gender and status ` });
  }
  members.push(newMember);
  res.json(members);
  //res.redirect(`/`);
});
//update member
router.put(`/:id`, (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
        member.gender = updMember.gender ? updMember.gender : member.gender;
        member.status = updMember.status ? updMember.status : member.status;
        res.json({ msg: `Member Updated`, member });
      }
    });
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No person with the id of ${req.params.id}` });
  }
});

//delete member
router.delete(`/:id`, (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: `Member deleted`,
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: `No person with the id of ${req.params.id}` });
  }
});

module.exports = router;
