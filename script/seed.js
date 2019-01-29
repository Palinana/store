const db = require('../server/db');
const { User, Product, Category, Order } = require('../server/db/models');

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({ email: 'cody@email.com',  password: '123' }),
    User.create({ email: 'sam@gmail.com', password: '456' }),
  ])

  const entries = await Promise.all([
    Category.create({ name: 'Chairs' }),
    Category.create({ name: 'Cofee Tables' }),
    Category.create({ name: 'Sofas' }),
    Category.create({ name: 'Lighting' })
  ])

  const products = await Promise.all([
    Product.create({ 
        name: 'Field Lounge Chair', price: 1499.99, quantity: 10, 
        description: 'Shapely curves, a gentle recline and adjust-right cushions invite the lost art of unwinding. A sculptural powder-coated steel base sets up the striking profile. Steel and bent plywood construction with light all-over padding, Reversible seat and back cushions filled with high resiliency foam with feather-down wrap, High resiliency foam cushions with feather down wrap provide a mix of firm support and comfort, and with use will take on a more casual appearance over time, Feather-down filled lumbar pillow included.',  
        categoryId: 1, width: 34.50, height: 30.50,
        color: 'Red', image: '/images/FieldLoungeChair.jpg '
    }),
    Product.create({ 
      name: 'Sepli Accent Chair', price: 769.99, quantity: 14, 
      description: 'Inspired by innovative avant garde architecture, our designers wrapped curved forms to create the Thea Chair is unique approach to seating. The two-toned upholstery overlaps in subtly contrasting fabrics for a singularly modern point of view.',  
      categoryId: 1, width: 34.50, height: 30.50,
      color: 'Gray', image: '/images/SepliAccentChair.jpg '
    }),
    Product.create({ 
      name: 'Echo Chair', price: 939.99, quantity: 5, 
      description: 'The Echo chair looks good from every angle, but its tilted seat creates a profile that can’t be missed and immediately adds to the design of a room. Its plush seat contrasts with its black steal supporting base that gives it chic visual contrast.',  
      categoryId: 1, width: 34.50, height: 30.50,
      color: 'Grey', image: '/images/EchoChair.jpg '
    }),
    Product.create({ 
      name: 'Omega Lounge Chair', price: 699.99, quantity: 2, 
      description: 'Cold-injected polyurethane foam with inner steel profile frame and special polyurethane inserts for back support. Covering material coupled with polyester padding.Shaped seat made of non-deformable polyurethane foam and wrapped with polyester wadding.',  
      categoryId: 1, width: 34.50, height: 32.50,
      color: 'Yellow', image: '/images/OmegaLoungeChair.jpg '
    }),
    Product.create({ 
      name: 'Wrenn Chair', price: 979.99, quantity: 12, 
      description: 'Shapely curves, a gentle recline and adjust-right cushions invite the lost art of unwinding. A sculptural powder-coated steel base sets up the striking profile. Steel and bent plywood construction with light all-over padding, Reversible seat and back cushions filled with high resiliency foam with feather-down wrap, High resiliency foam cushions with feather down wrap provide a mix of firm support and comfort, and with use will take on a more casual appearance over time, Feather-down filled lumbar pillow included.',  
      categoryId: 1, width: 32.50, height: 33.50,
      color: 'Green', image: '/images/WrennChair.jpg '
    }),
    Product.create({ 
      name: 'Stark Chair', price: 1299.99, quantity: 6, 
      description: 'The sophisticated profile of the Tyler Leather Square Arm Recliner features details like end caps on the arms and square legs that complement the graphic frame. This piece mixes well with other styles while adding a clean, updated look to a room.',  
      categoryId: 1, width: 29, height: 34,
      color: 'Orange', image: '/images/StarkChair.jpg '
    }),
    Product.create({ 
      name: 'Cloud LN5 Lounge Chair', price: 899.99, quantity: 2, 
      description: 'Designed to be spacious and expansive, Italian-born, Swedish-based designer Luca Nichetto wanted to minimise anything voluminous and accentuate the look and feel of lightness. Seen in this new version of Cloud Sofas with a high back. The secret to Cloud’s truly hygge sensation involves feather and foamfilled seat cushi.',  
      categoryId: 1, width: 32.50, height: 36,
      color: 'Gray', image: '/images/CloudLN5LoungeChair.jpg '
    }),
    Product.create({ 
      name: 'Adler Maxime Club Chair', price: 999.99, quantity: 6,
      description: 'An icon of the Modernist era, this dining chair was originally designed by Warren Platner. Both elegant and whimsical, the stainless steel wire base with gold finish was designed to resemble a shiny sheaf of wheat. The design provides not just a unique look, but also full support and stability for the seating shell. The wool-blend upholstered foam cushions add comfort to this sculptural piece while also giving visual contrast to the shiny metal frame.',
      categoryId: 1, width: 32.50, height: 30.50,
      color: 'Green', image: '/images/AdlerMaximeClubChair.jpg '
    }),
    Product.create({ 
      name: 'Avery Sofa', price: 799.99, quantity: 12, 
      description: 'A mid-century modern marvel, the Avery sofa features straight lines and a slim profile softened by the lush velvet-like upholstery and plump seat and back cushions. Piping detail in the same color as the fabric adds to the style, while the tapered solid hardwood legs provide the finishing touch. Two matching bolsters are included.',  
      categoryId: 2, width: 62.50, height: 32.50,
      color: 'Gray', image: '/images/AverySofa.jpg '
    }),
    Product.create({ 
      name: 'Cuomhouse Standard Sofa', price: 999.99, quantity: 3, 
      description: 'Set on gold stainless steel legs, this super comfortable sofa comes in rich gray and rose velvet options. Features removable seat and back cushions as well as two matching throw pillows.',  
      categoryId: 2, width: 59.50, height: 34.50,
      color: 'Pink', image: '/images/CuomhouseStandardSofa.jpg '
    }),
    Product.create({ 
      name: 'Everly Sofa', price: 879.99, quantity: 7, 
      description: 'Boldly incorporate a nostalgic touch of retro style into any space with the slick lines, track arms and textural, subdued-tone fabric of the Emberli Fabric Sofa Collection. Plush foam padded cushions take this set to the next level by offering enduring comfort that can always be appreciated.',  
      categoryId: 2, width: 60.50, height: 32.50,
      color: 'Blue', image: '/images/EverlySofa.jpg '
    }),
    Product.create({ 
      name: 'Balham Coffee Table', price: 275.99, quantity: 13, 
      description: 'Sleek, sculptural, and marvelously minimalist, this curated coffee table brings mid-century modern style to any seating ensemble! Expertly crafted of solid hardwoods with fine walnut veneers in a rich wood grain finish, the stunning tabletop strikes a rounded triangle-shaped silhouette.',  
      categoryId: 3, width: 30, height: 29.50,
      color: 'Brown', image: '/images/BalhamCoffeeTable.jpg '
    }),
    Product.create({ 
      name: 'Janae Coffee Table', price: 479.99, quantity: 2, 
      description: 'This coffee table brings an elegant touch to the living space with its dramatic, round shape. Featuring a tabletop of bold artistic expression, this is the perfect centerpiece for any living setting. Personalize this living room essential by selecting your wood and leg finish of choice for a piece that is uniquely yours..',  
      categoryId: 3, width: 34.50, height: 31,
      color: 'Blue', image: '/images/JanaeCoffeeTable.jpg '
    }),
    Product.create({ 
      name: 'Showtime Coffee Table', price: 1299.99, quantity: 4, 
      description: 'This coffee table brings an elegant touch to the living space with its dramatic, round shape. Featuring a tabletop of bold artistic expression, this is the perfect centerpiece for any living setting. Personalize this living room essential by selecting your wood and leg finish of choice for a piece that is uniquely yours..',  
      categoryId: 3, width: 37.50, height: 29,
      color: 'Brown', image: '/images/ShowtimeCoffeeTable.jpg '
    }),
    Product.create({ 
      name: 'Urchin Flush Mount Lighting', price: 199.99, quantity: 2, 
      description: 'Showcase your love for rocks with this coral agate round side table. Red and pink hues brighten the space next your chair or bed while providing a spot for a lamp, vase, or practical items.',  
      categoryId: 4, width: 34, height: 32,
      color: 'Orange', image: '/images/UrchinFlushMountLighting.jpg '
    }),
    Product.create({ 
      name: 'Strada Oval Lighting', price: 1499.99, quantity: 2, 
      description: 'The Urchin Flush Mount is the ultimate captivating statement piece well suited for spaces looking for wow in spaces without ultra high ceilings. From the side the light fixture appears oblong, but observed from below is a dazzling round mixture of metallic reflections of light from hundreds of steel spines. Bulbs interspersed between the spines then cast a subtle pattern of spiky shadows around the fixture further increasing the impact the fixture has on the space.',  
      categoryId: 4, width: 32.50, height: 27,
      color: 'Black', image: '/images/StradaOvalLighting.jpg '
    }),
    Product.create({ 
      name: 'Visual Comfort Lighting', price: 899.99, quantity: 2, 
      description: 'This Lighting from the E.F. Chapman Quincy collection by Visual Comfort will enhance your home with a perfect mix of form and function.',  
      categoryId: 4, width: 30, height: 30,
      color: 'Gold', image: '/images/VisualComfortLighting.jpg '
    })
    
  ])

  const orders = await Promise.all([
    Order.create({
        userId: 1,
        confirmationCode: 'aadan25n23l2',
        total: 19.99,
        status: 'COMPLETE',
        paymentMethod: 'VISA',
        cart: [
          {
            productId: 21,
            quantity: 3
          },
          {
            productId: 10,
            quantity: 1,
          }
        ]
    })
  ])
 
  console.log(`seeded successfully`);
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection');
    db.close()
    console.log('db connection closed');
  })

console.log('seeding...');