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

async function create(req, res) {
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

    const newChild = await createChild(child);
    res.status(201).json(newChild);
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
    const child = await getChildById(req.params.id);
    if (!child) return res.status(404).json({ error: 'Child not found' });
    if (child.profile_pic) {
      const urlParts = child.profile_pic.split('/');
      const filePath = urlParts.slice(7).join('/'); 
      const { error: deleteError } = await supabase
        .storage
        .from('childrenavatar')
        .remove([filePath]);

      if (deleteError) {
        console.warn('Error deleting image from Supabase:', deleteError.message);
      }
    }

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
