// backend/routes/index.js
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Model untuk contoh data
const Data = mongoose.model('barbershops', {
    latitude: {
        type: Number,
        require: true,
    },
    longitude: {
        type: Number,
        require: true,
    },
    namaBarbershop: {
        type: String,
        require: true,
        unique: true,
    },
    namaPemilik: {
        type: String,
        require: true,
        unique: true,
    },
    statusBarbershop: {
      type: Boolean,
      require: true,
    },
    typeUser: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    kodeVerifikasi: {
        type: Number,
        require: true,
    },
    nomorTelepon: {
        type: String,
        required: true,
        unique: true,
    },
    antrian: {
        type: Number,
        required: true,
    },
    priceList: {
      level:{
        type: [String],
        required: true,
      },
      price: {
        type: [Number],
        required: true,
      }
    },
    alamat: {
        type: String,
        required: false,
    },
    photo: {
        type: [String],
        required: false,
    }
});

// Create
router.post('/items', async (req, res) => {
  try {
    const item = new Data(req.body);
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read
router.get('/items', async (req, res) => {
  try {
    const items = await Data.find();
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/items/:id', async (req, res) => {
  try {
    const items = await Data.findById(req.params.id);
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/items/:name', async (req, res) => {
  try {
    const items = await Data.find({ $or: [{ namaBarbershop: req.params.name }, { namaPemilik: req.params.name }]});
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update
router.patch('/items/:id', async (req, res) => {
  try {
    const item = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete
router.delete('/items/:id', async (req, res) => {
  try {
    const item = await Data.findByIdAndDelete(req.params.id);
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
