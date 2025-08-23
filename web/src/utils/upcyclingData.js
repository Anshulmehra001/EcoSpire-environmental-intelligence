// FILE: src/utils/upcyclingData.js

// This is our expanded "AI Brain" - the central database for all upcycling projects.
export const upcyclingDatabase = {
    // --- Category: Fabrics ---
    "Old T-Shirt": {
      projects: [
        { id: 'tshirt_tote', title: "No-Sew Tote Bag", difficulty: "Easy", time: "20 minutes",
          description: "A simple, sturdy bag for groceries, created without sewing.",
          tools: ["Sharp Scissors", "Ruler"], materials: [],
          environmentalImpact: { landfillDivertedKg: 0.2, co2SavedKg: 1.5, waterSavedLiters: 2700 },
          steps: [ "Lay t-shirt flat and cut off sleeves.", "Cut off neckline for a wider opening.", "Cut 1-inch wide, 4-inch long vertical strips along the bottom hem.", "Tie front and back strips together in tight double knots to close the bag." ]
        },
        { id: 'tshirt_rug', title: "Braided Throw Rug", difficulty: "Hard", time: "3 hours",
          description: "Create a soft, colorful braided rug from several old t-shirts.",
          tools: ["Scissors", "Sewing Machine or Needle & Thread"], materials: ["3-5 Old T-Shirts"],
          environmentalImpact: { landfillDivertedKg: 1.0, co2SavedKg: 7.5, waterSavedLiters: 13500 },
          steps: [ "Cut t-shirts into long 2-inch wide strips.", "Sew three strips together at one end.", "Braid the three strips together tightly.", "Coil the braid into a flat spiral, sewing the edges together as you go.", "Continue adding new strips and coiling until you reach the desired size." ]
        },
        { id: 'tshirt_dogtoy', title: "Dog Chew Toy", difficulty: "Easy", time: "15 minutes",
          description: "A durable and washable chew toy for your furry friend.",
          tools: ["Scissors"], materials: ["1-2 Old T-Shirts"],
          environmentalImpact: { landfillDivertedKg: 0.3, co2SavedKg: 2.0, waterSavedLiters: 4000 },
          steps: ["Cut t-shirt into three 3-inch wide strips.", "Hold the three strips together and tie a knot at one end.", "Braid the strips tightly together.", "Tie another knot at the other end to secure the braid.", "Trim any excess fabric."]
        }
      ]
    },
    "Denim Jeans": {
      projects: [
        { id: 'jeans_pouch', title: "Zippered Pouch", difficulty: "Medium", time: "1.5 hours",
          description: "A durable and stylish pouch perfect for pencils, makeup, or small tools.",
          tools: ["Sewing Machine", "Scissors", "Pins"], materials: ["Old Jeans Leg", "7-inch Zipper", "Fabric for lining (optional)"],
          environmentalImpact: { landfillDivertedKg: 0.5, co2SavedKg: 4.0, waterSavedLiters: 7000 },
          steps: [ "Cut a 10x10 inch square from the leg of the jeans.", "If using a lining, cut a same-sized piece of fabric.", "Sew one edge of the denim to one side of the zipper.", "Sew the other edge of the denim to the other side of the zipper.", "Turn inside out, sew the remaining two sides closed.", "Turn right-side out through the zipper opening." ]
        },
        { id: 'jeans_coasters', title: "Denim Coasters", difficulty: "Easy", time: "45 minutes",
          description: "Craft unique and absorbent coasters from the seams of old jeans.",
          tools: ["Scissors", "Hot Glue Gun"], materials: ["Seams from old jeans"],
          environmentalImpact: { landfillDivertedKg: 0.1, co2SavedKg: 0.8, waterSavedLiters: 1400 },
          steps: [ "Carefully cut the thick, double-stitched seams off your old jeans.", "Begin coiling a seam strip tightly in a spiral.", "Apply a small dot of hot glue every inch or so on the inside to hold the coil together.", "Continue coiling and gluing until the coaster is about 4 inches in diameter.", "Cut the seam and glue the end securely." ]
        },
        { id: 'jeans_apron', title: "Gardening/Workshop Apron", difficulty: "Hard", time: "2.5 hours",
          description: "Create a rugged and practical apron from the back of a pair of jeans.",
          tools: ["Sewing Machine", "Scissors", "Measuring Tape"], materials: ["1 Pair of old jeans", "1-inch wide fabric straps or webbing"],
          environmentalImpact: { landfillDivertedKg: 0.6, co2SavedKg: 4.5, waterSavedLiters: 8000 },
          steps: ["Cut the back panel off the jeans, from the waistband down to the mid-thigh.", "The back pockets will now be the front pockets of your apron.", "Hem the raw edges of the cut denim panel.", "Cut two long pieces of fabric strap for the waist ties.", "Sew the waist ties securely to the top corners of the apron.", "Cut one more strap for the neck loop and sew it to the top edge."]
        }
      ]
    },
    "Old Sweater": {
      projects: [
          { id: 'sweater_mittens', title: "Cozy Wool Mittens", difficulty: "Medium", time: "1 hour",
            description: "Turn a shrunken or old wool sweater into warm mittens.",
            tools: ["Scissors", "Pins", "Needle and Thread"], materials: ["Old Wool Sweater"],
            environmentalImpact: { landfillDivertedKg: 0.4, co2SavedKg: 3.0, waterSavedLiters: 500},
            steps: ["Wash the wool sweater in hot water to felt it, making it thicker and preventing fraying.", "Lay your hand on the sweater and trace a mitten shape around it, leaving a half-inch seam allowance.", "Cut out four identical mitten shapes (two for each hand).", "With the right sides facing each other, pin two mitten shapes together and sew around the edge, leaving the bottom open.", "Turn the mitten right-side out. Repeat for the other hand."]
          },
          { id: 'sweater_pillow', title: "Decorative Pillow Cover", difficulty: "Easy", time: "30 minutes",
            description: "A simple way to create a soft, textured pillow cover.",
            tools: ["Scissors", "Sewing Machine or Fabric Glue"], materials: ["Old Sweater", "Pillow insert"],
            environmentalImpact: { landfillDivertedKg: 0.4, co2SavedKg: 3.0, waterSavedLiters: 500},
            steps: ["Lay the sweater flat and cut a square from the torso that is slightly larger than your pillow insert.", "Cut an identical square for the back.", "Place the two squares with their right sides together.", "Sew (or glue) around three of the four sides.", "Turn the cover right-side out and insert the pillow.", "Sew the final side closed by hand."]
          }
      ]
    },
    // --- Category: Glass & Metal ---
    "Glass Jar": {
      projects: [
        { id: 'jar_lantern', title: "Decorative Lantern", difficulty: "Easy", time: "30 minutes",
          description: "A beautiful, rustic lantern that can be used with LED or real candles.",
          tools: ["Pliers"], materials: ["Twine or Wire", "Paint (optional)", "Sand/Pebbles", "Tea Light Candle"],
          environmentalImpact: { landfillDivertedKg: 0.3, co2SavedKg: 0.5, waterSavedLiters: 50 },
          steps: [ "Ensure jar is clean and dry.", "Wrap twine or wire securely around the rim multiple times to create a hanger.", "Add a layer of sand or pebbles to the bottom for stability.", "Place an LED or real tea light candle inside." ]
        },
        { id: 'jar_terrarium', title: "Miniature Terrarium", difficulty: "Medium", time: "1 hour",
          description: "Create a tiny, self-sustaining ecosystem inside a glass jar.",
          tools: ["Spoon", "Tweezers"], materials: ["Small Pebbles", "Activated Charcoal", "Potting Soil", "Small Succulents or Moss"],
          environmentalImpact: { landfillDivertedKg: 0.3, co2SavedKg: 0.2, waterSavedLiters: 10 },
          steps: [ "Add a 1-inch layer of pebbles for drainage.", "Add a thin layer of activated charcoal to keep it fresh.", "Add a 2-3 inch layer of potting soil.", "Use tweezers to carefully plant your small succulents or arrange the moss.", "Lightly water and place in indirect sunlight." ]
        },
        { id: 'jar_sprouter', title: "Seed Sprouter Jar", difficulty: "Easy", time: "10 minutes (plus sprouting time)",
          description: "Easily grow your own fresh sprouts like alfalfa or mung bean.",
          tools: ["Hammer", "Small Nail"], materials: ["Glass Jar", "A piece of mesh or cheesecloth", "Rubber band or Jar Ring"],
          environmentalImpact: { landfillDivertedKg: 0.3, co2SavedKg: 0.1, waterSavedLiters: 5 },
          steps: ["If using the metal lid, use a hammer and nail to punch many small holes in it.", "Place seeds in the jar and cover with water to soak overnight.", "Drain the water. Cover the opening with your mesh/cheesecloth and secure with a rubber band, or use your punched lid.", "Rinse and drain the seeds twice a day.", "Keep the jar in a warm, dark place. Sprouts will be ready in 3-5 days."]
        }
      ]
    },
    "Wine Bottle": {
        projects: [
          { id: 'bottle_lamp', title: "Bottle Lamp", difficulty: "Hard", time: "2 hours",
            description: "Create an elegant and unique lamp from a beautiful wine bottle.",
            tools: ["Drill with a glass-cutting bit", "Safety Goggles"], materials: ["Wine Bottle", "Bottle lamp kit (cord, socket, plug)"],
            environmentalImpact: { landfillDivertedKg: 0.8, co2SavedKg: 1.0, waterSavedLiters: 100 },
            steps: ["Thoroughly clean the wine bottle and remove all labels.", "WEARING SAFETY GOGGLES, carefully drill a hole in the back of the bottle near the base for the lamp cord.", "Feed the lamp cord from the kit through the hole and up out of the bottle's opening.", "Follow the lamp kit's instructions to wire the socket to the cord.", "Insert the socket into the opening of the bottle.", "Add a lampshade and a lightbulb."]
          },
          { id: 'bottle_birdfeeder', title: "Self-filling Bird Feeder", difficulty: "Hard", time: "2.5 hours",
            description: "An attractive bird feeder that automatically dispenses seeds.",
            tools: ["Glass Bottle Cutter", "Sandpaper", "Drill"], materials: ["Wine Bottle", "Small Wooden Dish", "Screws", "Wire for hanging"],
            environmentalImpact: { landfillDivertedKg: 0.8, co2SavedKg: 1.0, waterSavedLiters: 100 },
            steps: ["Use the bottle cutter to score and separate the bottom of the wine bottle. Sand the cut edge smooth.", "Drill a small hole in the center of the wooden dish.", "Drill two small holes on opposite sides of the dish for the hanging wire.", "Invert the cut bottle and attach it to the dish using a central screw, leaving a small gap for seeds to dispense.", "Thread the wire through the side holes to create a hanger.", "Fill with birdseed from the top and hang."]
          }
        ]
    },
    "Tin Can": {
      projects: [
          { id: 'can_organizer', title: "Desk Organizer Caddy", difficulty: "Easy", time: "1 hour",
            description: "A colorful and practical organizer for pens, pencils, and art supplies.",
            tools: ["Hot Glue Gun", "Scissors"], materials: ["3-5 Tin Cans", "Spray Paint or Acrylic Paint", "Decorative Paper", "A piece of wood or sturdy cardboard for the base"],
            environmentalImpact: { landfillDivertedKg: 0.2, co2SavedKg: 0.4, waterSavedLiters: 20 },
            steps: [ "Clean the tin cans and remove any sharp edges.", "Paint the cans in your desired colors and let them dry completely.", "Arrange the cans on your base in a pattern you like.", "Use a hot glue gun to securely attach the bottom of each can to the base.", "You can also glue the cans to each other for extra stability." ]
          }
      ]
    },
    // --- Category: Paper & Plastic ---
    "Plastic Bottle": {
      projects: [
        { id: 'bottle_planter', title: "Self-Watering Planter", difficulty: "Medium", time: "40 minutes",
          description: "A clever planter that waters your plants for you, perfect for small herbs.",
          tools: ["Craft Knife or Scissors", "Thick String or Cotton Shoelace", "Small Nail or Drill Bit"],
          environmentalImpact: { landfillDivertedKg: 0.1, co2SavedKg: 0.2, waterSavedLiters: 5},
          steps: [ "Cut the plastic bottle in half about two-thirds of the way up.", "Unscrew the cap and poke a hole through the center.", "Thread a thick cotton string through the hole in the cap, leaving a tail on each side. Screw the cap back on.", "Invert the top half of the bottle and place it into the bottom half.", "Fill the bottom half (the reservoir) with water. Fill the top half with soil, ensuring the string is buried.", "The string will wick water up into the soil, keeping it moist." ]
        },
        { id: 'bottle_sprinkler', title: "Garden Sprinkler", difficulty: "Easy", time: "5 minutes",
          description: "A quick and easy way to water your garden on a summer day.",
          tools: ["Drill or Nail and Hammer"], materials: ["2-Liter Plastic Bottle", "Garden Hose", "Duct Tape (optional)"],
          environmentalImpact: { landfillDivertedKg: 0.1, co2SavedKg: 0.2, waterSavedLiters: 5},
          steps: ["Clean the bottle and remove the label.", "Poke 12-15 small holes on one side of the bottle.", "Attach the garden hose to the mouth of the bottle. If the fit is loose, wrap duct tape to create a seal.", "Lay the bottle in your garden with the holes facing up.", "Turn on the water!"]
        }
      ]
    },
    "Cardboard Box": {
      projects: [
        { id: 'box_organizer', title: "Decorative Storage Box", difficulty: "Easy", time: "35 minutes",
          description: "Upgrade a plain cardboard box into stylish storage that you'll want to display.",
          tools: ["Wrapping Paper or Fabric", "Glue or Mod Podge", "Scissors", "Ruler"],
          environmentalImpact: { landfillDivertedKg: 0.5, co2SavedKg: 0.3, waterSavedLiters: 100 },
          steps: [ "Cut the top flaps off the cardboard box if they are in the way.", "Measure and cut your decorative paper or fabric, leaving a few inches of overhang on all sides.", "Apply a thin layer of glue or Mod Podge to one side of the box.", "Carefully smooth the paper/fabric over the glued surface, removing air bubbles.", "Fold the overhang neatly over the edges and glue it to the inside.", "Repeat for all sides." ]
        },
        { id: 'box_cat_scratcher', title: "Cat Scratcher Pad", difficulty: "Medium", time: "1 hour",
          description: "A simple and satisfying scratcher that your cat will love.",
          tools: ["Box Cutter", "Ruler", "Hot Glue Gun"], materials: ["Lots of Cardboard Boxes", "Catnip (optional)"],
          environmentalImpact: { landfillDivertedKg: 2.0, co2SavedKg: 1.2, waterSavedLiters: 400 },
          steps: ["Cut one side of a box to be the base of your scratcher.", "Cut the rest of your cardboard into long strips, all the same width (e.g., 3 inches).", "Begin tightly rolling one of the strips into a spiral.", "When you reach the end of a strip, glue the end and then glue the start of a new strip to it, and continue rolling.", "Keep rolling and adding strips until the spiral is large enough to fit snugly inside your base.", "Sprinkle with catnip."]
        }
      ]
    },
    "Old Books": {
      projects: [
          { id: 'book_safe', title: "Hidden Book Safe", difficulty: "Medium", time: "1.5 hours",
            description: "A clever way to hide valuables in plain sight on your bookshelf.",
            tools: ["Craft Knife / X-Acto Knife", "Ruler", "Pencil"], materials: ["A thick, old hardcover book", "White Glue or Mod Podge"],
            environmentalImpact: { landfillDivertedKg: 0.8, co2SavedKg: 0.5, waterSavedLiters: 200 },
            steps: ["Open the book to the first page you want to cut (leave the first few pages intact).", "Use a brush to apply a layer of glue to the outside edges of the rest of the book's pages and let it dry. This glues them together.", "Use a pencil and ruler to draw a rectangle on the first cut page, about an inch from the edges.", "Carefully use the craft knife to cut along the rectangle, removing a few pages at a time.", "Continue cutting until your hidden compartment is deep enough.", "Brush the inside of the cut compartment with glue to seal it. Let dry completely."]
          }
      ]
    },
    // --- Category: Wood & Misc ---
    "Wooden Pallet": {
      projects: [
          { id: 'pallet_planter', title: "Vertical Garden Planter", difficulty: "Hard", time: "4 hours",
            description: "A space-saving vertical planter for herbs and flowers.",
            tools: ["Saw", "Pry Bar", "Hammer", "Drill", "Sandpaper"], materials: ["Wooden Pallet", "Landscaping Fabric", "Staple Gun", "Screws", "Wood Stain (optional)"],
            environmentalImpact: { landfillDivertedKg: 15.0, co2SavedKg: 25.0, waterSavedLiters: 0 },
            steps: [ "Disassemble the pallet carefully using a pry bar and hammer.", "Sand all wood pieces to remove splinters.", "Cut pieces to size to build box shapes for planting.", "Assemble the planter boxes using a drill and screws.", "Line the inside of each box with landscaping fabric, securing it with a staple gun.", "Arrange and attach the boxes to the main pallet frame to create a vertical structure." ]
          },
          { id: 'pallet_coffee_table', title: "Rustic Coffee Table", difficulty: "Hard", time: "5 hours",
            description: "Build a stylish industrial-style coffee table with built-in storage.",
            tools: ["Saw", "Drill", "Sander", "Wrench"], materials: ["Wooden Pallet", "4 Caster Wheels", "Screws", "Wood Varnish"],
            environmentalImpact: { landfillDivertedKg: 15.0, co2SavedKg: 25.0, waterSavedLiters: 0 },
            steps: [ "Find a pallet in good condition and clean it thoroughly.", "Sand the entire pallet, starting with coarse and moving to fine sandpaper.", "Cut the pallet to your desired table size if necessary.", "Apply two coats of wood varnish, letting it dry between coats.", "Attach the four caster wheels to the bottom corners using a drill and screws." ]
          }
      ]
    },
    "Wine Corks": {
      projects: [
          { id: 'cork_board', title: "Mini Bulletin Board", difficulty: "Medium", time: "1.5 hours",
            description: "Create a unique and functional bulletin board for notes and photos.",
            tools: ["Hot Glue Gun", "Craft Knife"], materials: ["~50-100 Wine Corks", "An old picture frame", "Sturdy cardboard backing"],
            environmentalImpact: { landfillDivertedKg: 0.5, co2SavedKg: 0.1, waterSavedLiters: 0 },
            steps: [ "Remove the glass and original backing from the picture frame.", "Cut a piece of sturdy cardboard to fit snugly inside the frame.", "Use the craft knife to carefully cut each wine cork in half lengthwise.", "Arrange the cork halves (flat side down) inside the frame to cover the cardboard.", "Once you have a layout you like, use a hot glue gun to glue each cork half down." ]
          }
      ]
    }
  };