const {
  getAllChildren,
  getChildById,
  createChild,
  updateChild,
  deleteChild,
} = require('../../services/Users/children.service');
const supabase = require('../../config/config');

async function getChildren(req, res) {
  try {
    const children = await getAllChildren();
    res.json(children);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getChild(req, res) {
  try {
    const child = await getChildById(req.params.id);
    if (!child) return res.status(404).json({ message: 'Child not found' });
    res.json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// controllers/childrenController.js
async function create(req, res) {
  try {
    const { forenames, surnames, birth_date, medical_info, gender, parent_id, driver_id } = req.body;
    const profilePicUrl = req.avatarUrl || null;

    const { data, error } = await supabase
      .from('children')
      .insert({
        forenames,
        surnames,
        birth_date,
        medical_info,
        gender,
        parent_id,
        driver_id,
        profile_pic: profilePicUrl
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const child = req.body;

    if (req.file) {
      const file = req.file;
      const fileName = `child_${Date.now()}_${file.originalname}`;

      const { error: uploadError } = await supabase
        .storage
        .from('childrenavatar')
        .upload(`avatars/${fileName}`, file.buffer, {
          contentType: file.mimetype,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase
        .storage
        .from('childrenavatar')
        .getPublicUrl(`avatars/${fileName}`);

      child.profile_pic = urlData.publicUrl;
    }

    const updated = await updateChild(req.params.id, child);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function remove(req, res) {
  try {
    await deleteChild(req.params.id); 
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getChildren,
  getChild,
  create,
  update,
  remove,
};
