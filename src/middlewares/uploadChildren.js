// middlewares/uploadChildrenAvatarToSupabase.js
const supabase = require('../config/config');

const uploadChildrenAvatarToSupabase = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const file = req.file;
    const filePath = `avatars/${Date.now()}-${file.originalname}`;

    const { error } = await supabase.storage
      .from('childrenavatar')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error('Error uploading child avatar to Supabase:', error);
      return res.status(500).json({ error: 'Error uploading child avatar to Supabase' });
    }

    const { data: publicUrlData } = supabase.storage
      .from('childrenavatar')
      .getPublicUrl(filePath);

    req.avatarUrl = publicUrlData.publicUrl;
    next();
  } catch (err) {
    console.error('Middleware error:', err);
    res.status(500).json({ error: 'Internal error processing child avatar image' });
  }
};

module.exports = uploadChildrenAvatarToSupabase;