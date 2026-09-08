// 40 位虚构艺术家的名录：数据仅用于站点演示，不对应任何真实或知名艺术家。
//
// bio 是第三人称的画廊介绍，statement 是第一人称的创作自述——两者在艺术家
// 主页上同屏出现，口吻必须分得开。artists.test.ts 里有几条守卫盯着这批文案
// 不要退回模板：简介开头、姓名后的动词、自述开头都不许扎堆。
import type { Artist } from './types';

export const ARTISTS: Artist[] = [
  {
    id: 'a01', slug: 'ilse-marchetti', name: 'Ilse Marchetti',
    country: 'Italy', city: 'Bologna', joinedYear: 2016, followers: 2140,
    bio: 'Ilse Marchetti paints from studies made along the Adriatic coast, then reworks each canvas in the studio over several months until the light settles.',
    statement: 'I never finish anything on the coast. The studies come back wet and wrong, and I spend the winter arguing with them. A painting is done when it stops reminding me of the afternoon it came from.',
    exhibitions: [
      'Galleria San Petronio, Bologna — solo, 2018',
      'Adriatic Light, group show, Rimini, 2021',
      'Premio Emilia, shortlist, 2023',
    ]
  },
  {
    id: 'a02', slug: 'tomas-vergara', name: 'Tomás Vergara',
    country: 'Chile', city: 'Valparaíso', joinedYear: 2013, followers: 3980,
    bio: 'Tomás Vergara works in thin oil layers on linen, building fields of colour that shift with the hour. He has exhibited across South America since 2011.',
    statement: 'Colour is the only subject I have ever had. I mix a field fresh each morning and put it down over yesterday\'s, so what you see is eleven mornings deep even though it reads as one flat plane.',
    exhibitions: [
      'Museo a Cielo Abierto, Valparaíso, 2014',
      'Campo de Color, Buenos Aires, 2017',
      'Bienal del Sur, São Paulo, 2022',
    ]
  },
  {
    id: 'a03', slug: 'nadia-belhaj', name: 'Nadia Belhaj',
    country: 'Morocco', city: 'Casablanca', joinedYear: 2019, followers: 1560,
    bio: 'Nadia Belhaj makes interiors emptied of people — doorways, corners, unlit rooms — using flat acrylic and a palette drawn from unpainted plaster.',
    statement: 'People keep asking where everyone went. Nobody left. I paint the ten minutes before a room is used, when the furniture is still holding the shape of the last person in it.',
    exhibitions: [
      'Villa des Arts, Casablanca — solo, 2020',
      'Interior Distance, Rabat, 2022',
      'Maghreb Contemporary, Tangier, 2024',
    ]
  },
  {
    id: 'a04', slug: 'ruben-alsberg', name: 'Ruben Alsberg',
    country: 'Netherlands', city: 'Rotterdam', joinedYear: 2011, followers: 5220,
    bio: 'Ruben Alsberg paints small panels outdoors in a single session, working against the weather. He has taught landscape painting in Rotterdam for a decade.',
    statement: 'One sitting, one panel, whatever the sky does. If it rains I paint the rain into it. My students find this unbearable, which is roughly the point of teaching it.',
    exhibitions: [
      'Kunsthal Rotterdam, group show, 2012',
      'Weather Studies, Amsterdam, 2016',
      'Twenty Panels, Utrecht — solo, 2021',
    ]
  },
  {
    id: 'a05', slug: 'yumi-kanazawa', name: 'Yumi Kanazawa',
    country: 'Japan', city: 'Kanazawa', joinedYear: 2015, followers: 6710,
    bio: 'Trained in traditional gold-leaf application before turning to gestural ink work, Yumi Kanazawa now shows a hybrid practice that folds old techniques into abstraction.',
    statement: 'Gold leaf taught me patience and ink taught me to spend it in one movement. The two disciplines disagree with each other on every canvas I make, and I have stopped trying to reconcile them.',
    exhibitions: [
      'Kanazawa 21st Century Museum, group show, 2016',
      'Leaf and Line, Tokyo — solo, 2019',
      'Ishikawa Prize, winner, 2022',
      'Contemporary Ink, Osaka, 2025',
    ]
  },
  {
    id: 'a06', slug: 'kwame-osei', name: 'Kwame Osei',
    country: 'Ghana', city: 'Kumasi', joinedYear: 2017, followers: 2985,
    bio: 'Kwame Osei builds up canvases with pigment mixed from local clay and ash, a process he learned from his grandfather, a textile dyer in Kumasi.',
    statement: 'My grandfather could tell which riverbank a clay came from by tasting it. I cannot do that. What I inherited was the habit of grinding my own colour, and the belief that it matters where it came from.',
    exhibitions: [
      'Kumasi Cultural Centre, 2018',
      'Earth and Ash, Accra — solo, 2021',
      'West African Contemporary, Lagos, 2024',
    ]
  },
  {
    id: 'a07', slug: 'elif-demirtas', name: 'Elif Demirtaş',
    country: 'Turkey', city: 'Izmir', joinedYear: 2020, followers: 1140,
    bio: 'Elif Demirtaş draws the Aegean coastline from memory rather than observation, producing loose, almost cartographic studies of harbours and cliffs.',
    statement: 'I stopped bringing paper to the coast. Memory edits better than I do — it throws away the parked cars and keeps the shape of the bay, which is the only part I wanted.',
    exhibitions: [
      'Izmir Art Centre, 2021',
      'Coastlines, Istanbul — solo, 2023',
      'Aegean Drawing, Bodrum, 2025',
    ]
  },
  {
    id: 'a08', slug: 'priya-nataraj', name: 'Priya Nataraj',
    country: 'India', city: 'Chennai', joinedYear: 2012, followers: 8340,
    bio: 'Priya Nataraj studied miniature painting in Chennai before scaling her compositions up to mural size; her recent work keeps the fine detail of the older form.',
    statement: 'A miniature asks you to lean in. A mural asks you to step back. I want a painting that does both, so I paint at arm\'s length and hope the detail survives the enlargement.',
    exhibitions: [
      'Lalit Kala Akademi, Chennai, 2013',
      'Scale and Detail, Delhi — solo, 2017',
      'Kochi Biennale, collateral, 2020',
      'South Asian Painting Now, Mumbai, 2024',
    ]
  },
  {
    id: 'a09', slug: 'sami-al-rashid', name: 'Sami Al-Rashid',
    country: 'Jordan', city: 'Amman', joinedYear: 2014, followers: 4470,
    bio: 'Sami Al-Rashid works from architectural photographs of Amman, translating stone facades into geometric prints cut by hand rather than machine.',
    statement: 'A laser would cut these cleaner and I would learn nothing. Cutting a facade by hand takes about as long as the building took to weather, which feels like the right exchange.',
    exhibitions: [
      'Darat al Funun, Amman, 2015',
      'Stone and Block, Beirut, 2019',
      'Printmaking Now, Cairo — solo, 2023',
    ]
  },
  {
    id: 'a10', slug: 'greta-lindqvist', name: 'Greta Lindqvist',
    country: 'Sweden', city: 'Malmö', joinedYear: 2018, followers: 1890,
    bio: 'Every January since 2014, Greta Lindqvist has returned to the same stretch of the Öresund strait to record how its pale winter light changes from year to year.',
    statement: 'The same shoreline, the same month, eleven years running. People assume it is a discipline. It is closer to an inability to leave a thing alone once I have started counting.',
    exhibitions: [
      'Malmö Konsthall, group show, 2019',
      'Öresund, January, Copenhagen — solo, 2022',
      'Nordic Light, Gothenburg, 2025',
    ]
  },
  {
    id: 'a11', slug: 'ana-paula-ferreira', name: 'Ana Paula Ferreira',
    country: 'Brazil', city: 'Salvador', joinedYear: 2010, followers: 9020,
    bio: 'Ana Paula Ferreira layers acrylic and collage to build dense, tropical compositions; she has shown steadily in Salvador and São Paulo since her first solo show in 2009.',
    statement: 'Everything goes in — bus tickets, wrapping paper, the printed side of a cement bag. Salvador is not a quiet place and I have never understood why a painting of it should be.',
    exhibitions: [
      'Museu de Arte Moderna da Bahia, 2009',
      'Camadas, São Paulo — solo, 2015',
      'Tropical Density, Rio de Janeiro, 2021',
      'Bienal de Salvador, 2024',
    ]
  },
  {
    id: 'a12', slug: 'lior-ben-david', name: 'Lior Ben-David',
    country: 'Israel', city: 'Haifa', joinedYear: 2016, followers: 2670,
    bio: 'Lior Ben-David makes small, dense gouache studies of the port at Haifa, working fast in a fixed twenty-minute session before the ferry light changes.',
    statement: 'Twenty minutes, then I stop whether it is finished or not. The constraint is not artistic discipline; it is that the light on the container cranes moves and I refuse to invent it.',
    exhibitions: [
      'Haifa Museum of Art, group show, 2017',
      'Twenty Minutes, Tel Aviv — solo, 2020',
      'Port Studies, Jaffa, 2023',
    ]
  },
  {
    id: 'a13', slug: 'chidi-okafor', name: 'Chidi Okafor',
    country: 'Nigeria', city: 'Lagos', joinedYear: 2021, followers: 980,
    bio: 'Chidi Okafor is a printmaker whose woodcuts of Lagos street markets are pulled in small runs, each impression varying slightly by hand-inked pressure.',
    statement: 'No two prints in an edition are the same and I have stopped apologising for it. The variation is where the hand is. A perfectly uniform run would mean a machine had done the interesting part.',
    exhibitions: [
      'Lagos Print Fair, 2022',
      'Market Days, Abuja — solo, 2024',
      'Nigerian Printmakers, Lagos, 2026',
    ]
  },
  {
    id: 'a14', slug: 'malin-sorensen', name: 'Malin Sørensen',
    country: 'Norway', city: 'Bergen', joinedYear: 2013, followers: 3310,
    bio: 'Malin Sørensen paints fjords in a near-monochrome grey palette, a discipline she adopted after a decade painting in full colour left her, in her words, restless.',
    statement: 'Taking the colour out was not a purification. It was closer to turning down a radio I had stopped listening to. Once the grey was all that was left, I could finally hear the shape of the water.',
    exhibitions: [
      'Bergen Kunsthall, 2014',
      'Grey Water, Oslo — solo, 2018',
      'Nordic Landscape, Stockholm, 2022',
    ]
  },
  {
    id: 'a15', slug: 'hana-kobayashi', name: 'Hana Kobayashi',
    country: 'Japan', city: 'Kyoto', joinedYear: 2022, followers: 760,
    bio: 'Hana Kobayashi apprenticed in a Kyoto woodblock workshop before developing her own reduction-print method, working in editions no larger than twelve.',
    statement: 'Reduction printing destroys the block as it goes, so the edition size is decided before the first cut and cannot be revisited. Twelve is what I can carve before my attention leaves.',
    exhibitions: [
      'Kyoto Print Studio, group show, 2023',
      'Twelve, Kyoto — solo, 2025',
    ]
  },
  {
    id: 'a16', slug: 'diego-mendoza', name: 'Diego Mendoza',
    country: 'Mexico', city: 'Oaxaca', joinedYear: 2011, followers: 7250,
    bio: 'Diego Mendoza draws on the muralist tradition of Oaxaca, though his own canvases are modest in scale, dense with figures crowded into narrow frames.',
    statement: 'I grew up under paintings the size of walls and I make things you could carry home under one arm. The crowd is still there. I have simply stopped asking a building to hold it.',
    exhibitions: [
      'Museo de Arte Contemporáneo de Oaxaca, 2012',
      'Pequeño Mural, Mexico City — solo, 2016',
      'Figuras, Guadalajara, 2020',
      'Oaxaca Now, 2025',
    ]
  },
  {
    id: 'a17', slug: 'amara-diallo', name: 'Amara Diallo',
    country: 'Senegal', city: 'Dakar', joinedYear: 2019, followers: 1420,
    bio: 'Amara Diallo works in reverse-glass painting, a technique she picked up from sign painters in Dakar, using it to render portraits of market vendors.',
    statement: 'Painting on glass means working backwards — the highlight goes down first, the background last. You commit to the face before you know what will sit behind it. I find that honest.',
    exhibitions: [
      'Galerie Le Manège, Dakar, 2020',
      'Sous Verre, Saint-Louis — solo, 2023',
      'Dak\'Art, off programme, 2024',
    ]
  },
  {
    id: 'a18', slug: 'ferenc-nagy', name: 'Ferenc Nagy',
    country: 'Hungary', city: 'Pécs', joinedYear: 2015, followers: 2050,
    bio: 'Ferenc Nagy makes charcoal drawings of abandoned factory interiors around Pécs, working on site with paper pinned directly to the wall.',
    statement: 'The paper picks up the wall. Grit, damp, whatever is flaking off that year — it all ends up in the drawing whether I want it or not, and by now I want it.',
    exhibitions: [
      'Zsolnay Quarter, Pécs, 2016',
      'Empty Halls, Budapest — solo, 2019',
      'Central European Drawing, Vienna, 2023',
    ]
  },
  {
    id: 'a19', slug: 'zainab-hussaini', name: 'Zainab Hussaini',
    country: 'Iran', city: 'Isfahan', joinedYear: 2017, followers: 3640,
    bio: 'Zainab Hussaini studied tile design in Isfahan and now paints large abstract canvases whose repeating motifs echo the geometry of that training.',
    statement: 'Tile work gives you a rule and asks you to find freedom inside it. I kept the rule. The canvases are large now because I wanted to see what happens when the pattern runs out of wall.',
    exhibitions: [
      'Isfahan Museum of Contemporary Art, 2018',
      'Geometry Without Tile, Tehran — solo, 2021',
      'Persian Abstraction, Dubai, 2024',
    ]
  },
  {
    id: 'a20', slug: 'thabo-nkosi', name: 'Thabo Nkosi',
    country: 'South Africa', city: 'Johannesburg', joinedYear: 2020, followers: 1310,
    bio: 'Since childhood sketches made from his family\'s balcony, Thabo Nkosi has returned again and again to township rooftops, rendering them in flat planes of colour.',
    statement: 'From up there the roofs read as one surface, all those separate households flattened into a single sheet of colour. That compression is the whole subject. I have never needed another.',
    exhibitions: [
      'Johannesburg Art Gallery, group show, 2021',
      'Rooftops, Cape Town — solo, 2023',
      'South African Painting, Durban, 2025',
    ]
  },
  {
    id: 'a21', slug: 'mireille-dubois', name: 'Mireille Dubois',
    country: 'France', city: 'Lyon', joinedYear: 2009, followers: 11400,
    bio: 'Mireille Dubois has shown still lifes of kitchen ephemera — peel, wax paper, spent matches — for over fifteen years, refining a narrow subject rather than widening it.',
    statement: 'A curator once told me to broaden my subject. Fifteen years later I am still painting what is on the counter at the end of a meal, and I have not run out yet.',
    exhibitions: [
      'Musée des Beaux-Arts de Lyon, 2010',
      'Nature Morte, Paris — solo, 2014',
      'Le Comptoir, Marseille, 2019',
      'Fifteen Years of Peel, Lyon — solo, 2024',
    ]
  },
  {
    id: 'a22', slug: 'jorge-castellanos', name: 'Jorge Castellanos',
    country: 'Colombia', city: 'Medellín', joinedYear: 2014, followers: 4980,
    bio: 'Jorge Castellanos paints crowded balconies and stairwells of Medellín in saturated colour, a style he traces to the comic strips he read as a boy.',
    statement: 'Comics taught me that you can put twelve people on a staircase and the eye will sort them out. I have never seen a reason to make a painting quieter than the street it came from.',
    exhibitions: [
      'Museo de Antioquia, Medellín, 2015',
      'Escaleras, Bogotá — solo, 2019',
      'Colour of the Andes, Quito, 2023',
    ]
  },
  {
    id: 'a23', slug: 'wilhelmina-brandt', name: 'Wilhelmina Brandt',
    country: 'Germany', city: 'Leipzig', joinedYear: 2012, followers: 5630,
    bio: 'Wilhelmina Brandt trained at the Leipzig academy and has kept a strict figurative practice since, painting sitters in long, unhurried sessions of natural light.',
    statement: 'My sitters get bored, and that is when the work starts. The first hour they are performing a face. By the third they have forgotten I am there, and I can finally paint someone.',
    exhibitions: [
      'Leipzig Academy Graduate Show, 2011',
      'Sitters, Berlin — solo, 2016',
      'Figurative Now, Dresden, 2020',
      'German Portrait Prize, shortlist, 2024',
    ]
  },
  {
    id: 'a24', slug: 'farah-tabrizi', name: 'Farah Tabrizi',
    country: 'Iran', city: 'Shiraz', joinedYear: 2023, followers: 640,
    bio: 'Farah Tabrizi makes delicate ink drawings of Shiraz rose gardens, working at a scale small enough to hold in one hand, a habit from years of travel.',
    statement: 'For a decade everything I owned had to fit in one bag, so the drawings learned to be small. I have a studio now and they have stayed small. The size turned out to be the work, not the circumstance.',
    exhibitions: [
      'Shiraz Arts Festival, 2024',
      'In One Hand, Tehran — solo, 2026',
    ]
  },
  {
    id: 'a25', slug: 'oluwaseun-adebayo', name: 'Oluwaseun Adebayo',
    country: 'Nigeria', city: 'Ibadan', joinedYear: 2016, followers: 3150,
    bio: 'Oluwaseun Adebayo builds textured surfaces from layered fabric and pigment, a nod to the adire dye traditions of Ibadan reworked into abstract fields.',
    statement: 'Adire is a resist technique — you decide where the colour will not go. I work the same way with pigment and cloth, blocking out more than I put down, so the surface is mostly refusal.',
    exhibitions: [
      'National Museum, Lagos, 2017',
      'Resist, Ibadan — solo, 2020',
      'Textile and Abstraction, Accra, 2024',
    ]
  },
  {
    id: 'a26', slug: 'katarzyna-wojcik', name: 'Katarzyna Wójcik',
    country: 'Poland', city: 'Kraków', joinedYear: 2018, followers: 2260,
    bio: 'What began as an architecture student\'s survey of Kraków tenement stairwells became Katarzyna Wójcik\'s long-running subject, and she has never quite set it aside.',
    statement: 'I was supposed to be measuring them for a thesis. I kept drawing instead, and eventually admitted the drawings were better than the measurements. The thesis was never finished.',
    exhibitions: [
      'Bunkier Sztuki, Kraków, 2019',
      'Klatka Schodowa, Warsaw — solo, 2022',
      'Polish Interiors, Wrocław, 2025',
    ]
  },
  {
    id: 'a27', slug: 'rania-khoury', name: 'Rania Khoury',
    country: 'Lebanon', city: 'Beirut', joinedYear: 2010, followers: 6890,
    bio: 'Rania Khoury has painted the Beirut waterfront through several of its transformations, keeping a single vantage point across more than a decade of canvases.',
    statement: 'Same window, same angle, whatever happens to be standing there that year. The paintings only mean anything laid side by side, which is awkward when someone wants to buy just one, and I have never found a good answer to that.',
    exhibitions: [
      'Beirut Art Center, 2011',
      'One Window, Beirut — solo, 2015',
      'Mediterranean Contemporary, Athens, 2019',
      'A Decade of the Corniche, Beirut, 2023',
    ]
  },
  {
    id: 'a28', slug: 'bjorn-eriksen', name: 'Bjørn Eriksen',
    country: 'Denmark', city: 'Aarhus', joinedYear: 2013, followers: 3470,
    bio: 'Bjørn Eriksen makes spare graphite drawings of North Sea ferries, each one built from dozens of thin, overlapping lines rather than a single contour.',
    statement: 'A single confident line is a lie about how looking works. I put down thirty uncertain ones instead and let the ferry emerge from the disagreement between them.',
    exhibitions: [
      'Aarhus Kunstmuseum, group show, 2014',
      'Overlapping Lines, Copenhagen — solo, 2018',
      'North Sea Drawing, Hamburg, 2022',
    ]
  },
  {
    id: 'a29', slug: 'lucia-fernandez', name: 'Lucía Fernández',
    country: 'Argentina', city: 'Córdoba', joinedYear: 2021, followers: 1670,
    bio: 'Working entirely from memory once she is back in the studio, Lucía Fernández renders the dry hills outside Córdoba in a limited ochre and violet palette.',
    statement: 'If I paint the hills in front of the hills, I get a description. Back in the studio a week later, all that survives is ochre and violet and a shape, and that is closer to what being there felt like.',
    exhibitions: [
      'Museo Caraffa, Córdoba, 2022',
      'Sierras, Buenos Aires — solo, 2024',
      'Argentine Landscape, Rosario, 2026',
    ]
  },
  {
    id: 'a30', slug: 'daniel-ochieng', name: 'Daniel Ochieng',
    country: 'Kenya', city: 'Kisumu', joinedYear: 2022, followers: 890,
    bio: 'Daniel Ochieng paints fishing boats on Lake Victoria at dawn, a subject he chose so that every canvas is finished, by necessity, before the light changes.',
    statement: 'The boats go out at five and the light is useless by seven. Two hours is the whole painting. I chose the subject partly because it makes finishing non-negotiable.',
    exhibitions: [
      'Kisumu Museum, 2023',
      'Dawn Boats, Nairobi — solo, 2025',
    ]
  },
  {
    id: 'a31', slug: 'mei-lin-tan', name: 'Mei Lin Tan',
    country: 'Singapore', city: 'Singapore', joinedYear: 2015, followers: 4210,
    bio: 'Mei Lin Tan combines ink wash with digital collage, printing on rice paper to keep the softness of the traditional medium in an otherwise contemporary process.',
    statement: 'The digital part is invisible if I have done it properly. Rice paper forgives the pixel the way it forgives the brush — everything softens at the edge, and the two processes stop arguing.',
    exhibitions: [
      'Singapore Art Museum, group show, 2016',
      'Wash and Pixel, Singapore — solo, 2019',
      'Southeast Asian Contemporary, Bangkok, 2023',
    ]
  },
  {
    id: 'a32', slug: 'esteban-rios', name: 'Esteban Ríos',
    country: 'Peru', city: 'Arequipa', joinedYear: 2011, followers: 5960,
    bio: 'Esteban Ríos carves linocuts of the volcanoes around Arequipa, printing them in editions that sell out locally before ever reaching a gallery.',
    statement: 'Misti is on every postcard in the city and people still buy the prints. I think it is because a carved line admits it is a translation, and a photograph pretends it is not.',
    exhibitions: [
      'Casa del Moral, Arequipa, 2012',
      'Volcanes, Lima — solo, 2016',
      'Andean Printmaking, La Paz, 2021',
    ]
  },
  {
    id: 'a33', slug: 'ingrid-vandermeer', name: 'Ingrid Vandermeer',
    country: 'Belgium', city: 'Ghent', joinedYear: 2009, followers: 8100,
    bio: 'Ingrid Vandermeer has painted the same Ghent canal for close to two decades, a discipline she describes as a way of measuring her own slow change.',
    statement: 'The canal has barely moved in twenty years. I have. Lining the paintings up chronologically is less a record of a place than an unflattering chart of my own attention.',
    exhibitions: [
      'SMAK, Ghent, group show, 2010',
      'Het Kanaal, Brussels — solo, 2014',
      'Low Countries Painting, Antwerp, 2019',
      'Twenty Years, One Canal, Ghent, 2025',
    ]
  },
  {
    id: 'a34', slug: 'yaw-boateng', name: 'Yaw Boateng',
    country: 'Ghana', city: 'Accra', joinedYear: 2019, followers: 2540,
    bio: 'Yaw Boateng makes bold acrylic portraits of Accra market traders, painting quickly on the street and finishing details afterward from photographs.',
    statement: 'Nobody has time to sit for me — they are running a stall. I get twenty minutes and a phone photograph, and the painting has to hold whatever I understood in those twenty minutes.',
    exhibitions: [
      'Nubuke Foundation, Accra, 2020',
      'Traders, Kumasi — solo, 2023',
      'Portraits of West Africa, Abidjan, 2025',
    ]
  },
  {
    id: 'a35', slug: 'noor-al-sayed', name: 'Noor Al-Sayed',
    country: 'Egypt', city: 'Alexandria', joinedYear: 2014, followers: 3890,
    bio: 'Noor Al-Sayed paints crumbling Alexandria facades in loose watercolour, a practice she began while documenting buildings slated for demolition.',
    statement: 'About a third of what I have painted is gone now. The looseness was practical at first — I had to work fast before the demolition crews arrived — and then it became the way I see the city.',
    exhibitions: [
      'Bibliotheca Alexandrina, 2015',
      'Before Demolition, Cairo — solo, 2018',
      'Mediterranean Cities, Alexandria, 2022',
    ]
  },
  {
    id: 'a36', slug: 'viktor-kovac', name: 'Viktor Kovač',
    country: 'Croatia', city: 'Split', joinedYear: 2017, followers: 1780,
    bio: 'Viktor Kovač draws the stone alleys of Split in dense cross-hatched ink, a technique inherited from an uncle who restored old manuscripts.',
    statement: 'My uncle repaired pages that were six hundred years old and never signed one. He taught me hatching as a repair technique. I use it to build something instead, which he found funny.',
    exhibitions: [
      'Split City Museum, 2018',
      'Kamen, Zagreb — solo, 2021',
      'Adriatic Drawing, Dubrovnik, 2024',
    ]
  },
  {
    id: 'a37', slug: 'consolata-mwangi', name: 'Consolata Mwangi',
    country: 'Kenya', city: 'Nairobi', joinedYear: 2020, followers: 1990,
    bio: 'Sketching during her own daily ride to the studio, Consolata Mwangi captures Nairobi matatu commuters in quick, gestural strokes.',
    statement: 'I draw on my knees on a moving bus, so the line is never mine alone — the road puts something into every stroke. On the days the traffic is smooth the drawings are noticeably worse.',
    exhibitions: [
      'Nairobi National Museum, group show, 2021',
      'Matatu, Nairobi — solo, 2024',
      'East African Drawing, Kampala, 2026',
    ]
  },
  {
    id: 'a38', slug: 'santiago-molina', name: 'Santiago Molina',
    country: 'Spain', city: 'Seville', joinedYear: 2012, followers: 6420,
    bio: 'Santiago Molina paints Seville courtyards at midday, when the shadows are shortest, a constraint he set for himself early in his career and has kept since.',
    statement: 'Midday is the worst hour to paint and I have painted nothing else for twelve years. Flat light removes every easy effect. What is left is the geometry, which was always the part I wanted.',
    exhibitions: [
      'Centro Andaluz de Arte Contemporáneo, Seville, 2013',
      'Mediodía, Madrid — solo, 2017',
      'Spanish Light, Barcelona, 2022',
    ]
  },
  {
    id: 'a39', slug: 'jae-won-shin', name: 'Jae-won Shin',
    country: 'South Korea', city: 'Busan', joinedYear: 2016, followers: 3720,
    bio: 'Jae-won Shin builds abstract compositions from the shipping-container colours of the Busan docks, mixing his own pigments to match them.',
    statement: 'There are maybe nine colours a container can be, and I have matched all of them by hand. The paintings are abstract only because I removed the containers, not because I invented the palette.',
    exhibitions: [
      'Busan Museum of Art, 2017',
      'Nine Colours, Seoul — solo, 2020',
      'Korean Abstraction, Gwangju, 2024',
    ]
  },
  {
    id: 'a40', slug: 'petra-novakova', name: 'Petra Nováková',
    country: 'Czech Republic', city: 'Brno', joinedYear: 2010, followers: 4560,
    bio: 'Petra Nováková has spent her career drawing Brno\'s functionalist architecture in fine pen line, treating each building as a portrait of its era.',
    statement: 'These buildings were drawn before they were built, and I am drawing them back. A functionalist facade is already a diagram of somebody\'s optimism; my job is mostly not to add anything.',
    exhibitions: [
      'Moravian Gallery, Brno, 2011',
      'Funkcionalismus, Prague — solo, 2015',
      'Central European Architecture in Drawing, Vienna, 2020',
      'Brno Lines, 2024',
    ]
  },
];

const byId = new Map(ARTISTS.map(a => [a.id, a]));
const bySlug = new Map(ARTISTS.map(a => [a.slug, a]));

export function artistById(id: string): Artist | undefined {
  return byId.get(id);
}

export function artistBySlug(slug: string): Artist | undefined {
  return bySlug.get(slug);
}
