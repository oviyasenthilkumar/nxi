require('dotenv').config();


// backend/server.js
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require('body-parser');


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("API is working!");
  });
  
//   app.get('/api/nested-data', async (req, res) => {
//     try {
//       const nestedData = await prisma.nestedArray.findMany({
//         include: { children: true, project: true, associations: true }, // Adjust as needed
//       });
//       res.json(nestedData);
//     } catch (error) {
//       console.error("Error fetching nested data:", error);
//       res.status(500).json({ error: error.message });
//     }
//   });
  
  app.get("/api/nested-data", async (req, res) => {
    try {
      const nestedData = await prisma.nestedArray.findMany({
        include: { children: true, project: true, associations: true }, // Ensure relationships exist
      });
      res.json(nestedData);
    } catch (error) {
      console.error("🔥 Error fetching nested data:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  
  

  app.post('/api/nested-data', async (req, res) => {
    try {
      const { name, description, level, parentId, attributes, projectId } = req.body;
      
      // Validate request
      if (!name || !projectId) {
        return res.status(400).json({ error: "Name and projectId are required" });
      }
  
      // Insert data using Prisma
      const newNestedArray = await prisma.nestedArray.create({
        data: {
           name, 
           description, 
           level, 
           parentId, 
           attributes, 
           projectId 
          },
      });
  
      res.status(201).json(newNestedArray);
    } catch (error) {
      console.error("Error in /api/nested-data:", error);
      res.status(500).json({ error: error.message });
    }
  });
  

  app.put("/api/nested-data/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const updatedEntry = await prisma.nestedArray.update({
        where: { id: parseInt(id) },
        data: { name, description },
      });
      res.json(updatedEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.delete("/api/nested-data/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.nestedArray.delete({ where: { id: parseInt(id) } });
      res.json({ message: "Entry deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get all nested arrays
app.get('/api/nested-arrays', async (req, res) => {
  try {
    const nestedArrays = await prisma.nestedArray.findMany({
      where: {
        level: 1 // Get only top-level items
      },
      include: {
        children: {
          include: {
            children: true // Include nested children
          }
        }
      },
      level,
      parentId,
      attributes: JSON.stringify(attributes),
      projectId: "default-project-id"
    });
    res.json(nestedArrays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new nested array
app.post('/api/nested-arrays', async (req, res) => {
  try {
    const { name, description, level, parentId, attributes } = req.body;
    
    const newArray = await prisma.nestedArray.create({
      data: {
        name,
        description,
        level,
        parentId,
        attributes: JSON.stringify(attributes),
        projectId: "default-project-id" // You might want to make this dynamic
      }
    });
    
    res.json(newArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update nested array
app.put('/api/nested-arrays/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, attributes } = req.body;
    
    const updatedArray = await prisma.nestedArray.update({
      where: { id },
      data: {
        name,
        description,
        attributes: JSON.stringify(attributes)
      }
    });
    
    res.json(updatedArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete nested array
app.delete('/api/nested-arrays/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // First delete all children
    await prisma.nestedArray.deleteMany({
      where: {
        parentId: id
      }
    });
    
    // Then delete the parent
    await prisma.nestedArray.delete({
      where: { id }
    });
    
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    // Helper function to recursively include nested children
    const getNestedItems = async (parentId = null) => {
      const items = await prisma.nestedItem.findMany({
        where: { parentId },
        orderBy: { id: 'asc' },
      });
      
      // For each item, fetch its children recursively
      for (const item of items) {
        item.children = await getNestedItems(item.id);
      }
      
      return items;
    };
    
    // Get all top-level items with their recursive children
    const items = await getNestedItems();
    res.json(items);
  } catch (error) {
    console.error("Error fetching nested items:", error);
    res.status(500).json({ error: error.message });
  }
});

// // Create new item
// app.post('/api/items', async (req, res) => {
//   try {
//     const { name, description, parentId, attribute1, attribute2, attribute3, attribute4 } = req.body;
//     const item = await prisma.nestedItem.create({
//       data: {
//         name,
//         description,
//         parentId: parentId || null,
//         attribute1,
//         attribute2,
//         attribute3,
//         attribute4
//       }
//     });
//     res.json(item);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.post("/api/items", async (req, res) => {
  try {
    console.log("Received request:", req.body); // Debugging log

    const { name, description, parentId, attributes } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: "Name and description are required." });
    }

    const newItem = await prisma.nestedItem.create({
      data: {
        name,
        description,
        parentId: parentId ? parseInt(parentId) : null,
        attributes: attributes ? JSON.stringify(attributes) : null // Store as JSON
      },
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error("❌ Error in POST /api/items:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Update item
app.put('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, attribute1, attribute2, attribute3, attribute4 } = req.body;
    const item = await prisma.nestedItem.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        attribute1,
        attribute2,
        attribute3,
        attribute4
      }
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.nestedItem.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
