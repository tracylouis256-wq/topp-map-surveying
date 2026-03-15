import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilter from '../components/projects/ProjectFilter';
import ProjectModal from '../components/projects/ProjectModal';

const ProjectsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // All 63 projects with unique image paths - YOU DOWNLOAD IMAGES TO THESE PATHS
  const projects = [
    // Greater Accra Region (7 projects)
    {
      id: 1,
      title: 'East Legon Residential Development',
      location: 'East Legon, Accra',
      description: 'Boundary survey for 50-acre luxury residential development',
      equipment: 'GNSS RTK, Total Station',
      image: '/images/projects/greater-accra/east-legon-residential.jpg',
      category: 'cadastral',
      completionDate: '2024',
      region: 'Greater Accra',
      client: 'Devtraco Properties',
      coordinates: [5.627, -0.168]
    },
    {
      id: 2,
      title: 'Tema Port Expansion Phase 1',
      location: 'Tema',
      description: 'Site layout and monitoring for port expansion project',
      equipment: 'Total Station, 3D Laser Scanner',
      image: '/images/projects/greater-accra/tema-port.jpg',
      category: 'construction',
      completionDate: '2018',
      region: 'Greater Accra',
      client: 'GPHA',
      coordinates: [5.669, 0.016]
    },
    {
      id: 3,
      title: 'Airport City Commercial Complex',
      location: 'Airport City, Accra',
      description: 'Topographic mapping for new shopping mall development',
      equipment: 'Drone, GNSS RTK',
      image: '/images/projects/greater-accra/airport-city.jpg',
      category: 'topographic',
      completionDate: '2021',
      region: 'Greater Accra',
      client: 'Delwen Limited',
      coordinates: [5.597, -0.187]
    },
    {
      id: 4,
      title: 'Kaneshi Estate Redevelopment',
      location: 'Kaneshi, Accra',
      description: 'Redevelopment survey for 500 housing units',
      equipment: 'GNSS RTK, Total Station',
      image: '/images/projects/greater-accra/kaneshi-estate.jpg',
      category: 'construction',
      completionDate: '2015',
      region: 'Greater Accra',
      client: 'State Housing Company',
      coordinates: [5.571, -0.210]
    },
    {
      id: 5,
      title: 'Ada Coastal Erosion Study',
      location: 'Ada Foah',
      description: 'Aerial mapping for coastal erosion monitoring',
      equipment: 'Drone Photogrammetry',
      image: '/images/projects/greater-accra/ada-coastal.jpg',
      category: 'drone',
      completionDate: '2022',
      region: 'Greater Accra',
      client: 'Hydrological Services Department',
      coordinates: [5.783, 0.633]
    },
    {
      id: 6,
      title: 'Accra Digital Centre',
      location: 'Ring Road, Accra',
      description: 'Construction layout for office complex',
      equipment: 'Total Station',
      image: '/images/projects/greater-accra/digital-centre.jpg',
      category: 'construction',
      completionDate: '2019',
      region: 'Greater Accra',
      client: 'Ministry of Communications',
      coordinates: [5.579, -0.204]
    },
    {
      id: 7,
      title: 'Weija Dam Rehabilitation',
      location: 'Weija',
      description: 'Dam wall monitoring and volume calculations',
      equipment: '3D Laser Scanner, Drone',
      image: '/images/projects/greater-accra/weija-dam.jpg',
      category: 'engineering',
      completionDate: '2013',
      region: 'Greater Accra',
      client: 'GWCL',
      coordinates: [5.571, -0.330]
    },

    // Ashanti Region (6 projects)
    {
      id: 8,
      title: 'Kejetia Market Redevelopment Phase 1',
      location: 'Kejetia, Kumasi',
      description: 'Site layout for market expansion',
      equipment: 'Total Station, GNSS RTK',
      image: '/images/projects/ashanti/kejetia-market.jpg',
      category: 'construction',
      completionDate: '2016',
      region: 'Ashanti',
      client: 'KMA',
      coordinates: [6.697, -1.620]
    },
    {
      id: 9,
      title: 'Nyinahin Bauxite Mine Development',
      location: 'Nyinahin, Ashanti Region',
      description: 'Mine site topography and volume calculations',
      equipment: 'Drone, GNSS RTK, Total Station',
      image: '/images/projects/ashanti/nyinahin-mine.jpg',
      category: 'mining',
      completionDate: '2023',
      region: 'Ashanti',
      client: 'GIADEC',
      coordinates: [6.950, -2.100]
    },
    {
      id: 10,
      title: 'KNUST Campus Expansion',
      location: 'KNUST, Kumasi',
      description: 'Topographic mapping for new faculty buildings',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/ashanti/knust-expansion.jpg',
      category: 'topographic',
      completionDate: '2014',
      region: 'Ashanti',
      client: 'KNUST',
      coordinates: [6.687, -1.571]
    },
    {
      id: 11,
      title: 'Asokwa Industrial Zone',
      location: 'Asokwa, Kumasi',
      description: 'Land registration for 20 industrial plots',
      equipment: 'GNSS RTK',
      image: '/images/projects/ashanti/asokwa-industrial.jpg',
      category: 'cadastral',
      completionDate: '2017',
      region: 'Ashanti',
      client: 'Kumasi Industrial Park',
      coordinates: [6.664, -1.608]
    },
    {
      id: 12,
      title: 'Lake Bosomtwe Shoreline Mapping',
      location: 'Lake Bosomtwe',
      description: 'Aerial mapping of lake perimeter and encroachment',
      equipment: 'Drone Photogrammetry',
      image: '/images/projects/ashanti/bosomtwe.jpg',
      category: 'drone',
      completionDate: '2020',
      region: 'Ashanti',
      client: 'EPA',
      coordinates: [6.508, -1.422]
    },
    {
      id: 13,
      title: 'Obuasi Gold Mine Infrastructure',
      location: 'Obuasi',
      description: 'Underground and surface survey for mine expansion',
      equipment: '3D Laser Scanner, Total Station',
      image: '/images/projects/ashanti/obuasi-mine.jpg',
      category: 'mining',
      completionDate: '2012',
      region: 'Ashanti',
      client: 'AngloGold Ashanti',
      coordinates: [6.204, -1.672]
    },

    // Western Region - TARKWA/NSIAEM AREA (10 projects)
    {
      id: 14,
      title: 'Takoradi Port Expansion',
      location: 'Takoradi',
      description: 'Bathymetric survey for new berth construction',
      equipment: 'Multibeam Echo Sounder, GNSS RTK',
      image: '/images/projects/western/takoradi-port.jpg',
      category: 'construction',
      completionDate: '2019',
      region: 'Western',
      client: 'GPHA',
      coordinates: [4.877, -1.757]
    },
    // TARKWA MUNICIPALITY - CADASTRAL SURVEYS
    {
      id: 15,
      title: 'Tarkwa Town Boundary Demarcation',
      location: 'Tarkwa Municipality',
      description: 'Comprehensive boundary survey for municipal expansion',
      equipment: 'GNSS RTK, Total Station',
      image: '/images/projects/western/tarkwa-boundary.jpg',
      category: 'cadastral',
      completionDate: '2010',
      region: 'Western',
      client: 'Tarkwa Municipal Assembly',
      coordinates: [5.306, -1.989]
    },
    {
      id: 16,
      title: 'Tarkwa - Aboso Road Corridor Land Registration',
      location: 'Tarkwa-Aboso Highway',
      description: 'Systematic land title registration along highway corridor',
      equipment: 'GNSS RTK, GPS Data Collectors',
      image: '/images/projects/western/tarkwa-aboso.jpg',
      category: 'cadastral',
      completionDate: '2018',
      region: 'Western',
      client: 'Lands Commission - Western Region',
      coordinates: [5.317, -1.968]
    },
    {
      id: 17,
      title: 'University of Mines and Technology Land Survey',
      location: 'UMaT, Tarkwa',
      description: 'Campus boundary and facility mapping',
      equipment: 'GNSS RTK, Total Station',
      image: '/images/projects/western/umat-tarkwa.jpg',
      category: 'cadastral',
      completionDate: '2015',
      region: 'Western',
      client: 'UMaT',
      coordinates: [5.301, -1.998]
    },
    {
      id: 18,
      title: 'Tarkwa Industrial Area Plot Registration',
      location: 'Tarkwa Industrial Zone',
      description: 'Cadastral survey for 50 industrial plots',
      equipment: 'GNSS RTK',
      image: '/images/projects/western/tarkwa-industrial.jpg',
      category: 'cadastral',
      completionDate: '2021',
      region: 'Western',
      client: 'Tarkwa Industrial Development',
      coordinates: [5.312, -1.979]
    },
    // WASSA AGONA MUNICIPALITY - CADASTRAL SURVEYS
    {
      id: 19,
      title: 'Wassa Agona Township Expansion',
      location: 'Wassa Agona',
      description: 'Boundary survey for new residential areas',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/western/wassa-agona.jpg',
      category: 'cadastral',
      completionDate: '2022',
      region: 'Western',
      client: 'Wassa Agona Municipal Assembly',
      coordinates: [5.527, -1.912]
    },
    {
      id: 20,
      title: 'Agona - Nsuaem Road Land Registration',
      location: 'Agona Nsuaem',
      description: 'Property boundary demarcation along highway',
      equipment: 'GNSS RTK',
      image: '/images/projects/western/agona-nsuaem.jpg',
      category: 'cadastral',
      completionDate: '2016',
      region: 'Western',
      client: 'Lands Commission',
      coordinates: [5.541, -1.928]
    },
    {
      id: 21,
      title: 'Nsuaem Commercial Area Cadastre',
      location: 'Nsuaem, Western Region',
      description: 'Commercial property registration and mapping',
      equipment: 'GNSS RTK, Total Station',
      image: '/images/projects/western/nsuaem-commercial.jpg',
      category: 'cadastral',
      completionDate: '2013',
      region: 'Western',
      client: 'Nsuaem Traditional Council',
      coordinates: [5.557, -1.941]
    },
    {
      id: 22,
      title: 'Essiama Palm Plantation',
      location: 'Essiama, Western Region',
      description: 'Large-scale topographic mapping for oil palm plantation',
      equipment: 'Drone, GNSS RTK',
      image: '/images/projects/western/essiama-plantation.jpg',
      category: 'topographic',
      completionDate: '2017',
      region: 'Western',
      client: 'Benso Oil Palm Plantation',
      coordinates: [4.944, -2.222]
    },
    {
      id: 23,
      title: 'Nzema Gold Exploration',
      location: 'Nzema, Western Region',
      description: 'Exploration grid and geological mapping',
      equipment: 'GNSS RTK, GIS Software',
      image: '/images/projects/western/nzema-gold.jpg',
      category: 'mining',
      completionDate: '2011',
      region: 'Western',
      client: 'Endeavour Mining',
      coordinates: [4.833, -2.267]
    },
    {
      id: 24,
      title: 'Axim Beach Resort Development',
      location: 'Axim',
      description: 'Topographic and boundary survey for resort',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/western/axim-resort.jpg',
      category: 'topographic',
      completionDate: '2020',
      region: 'Western',
      client: 'Axim Beach Resort',
      coordinates: [4.867, -2.242]
    },

    // Western North Region (4 projects)
    {
      id: 25,
      title: 'Bibiani Gold Mine Survey',
      location: 'Bibiani',
      description: 'Pit volume calculations and wall stability monitoring',
      equipment: '3D Laser Scanner, Drone',
      image: '/images/projects/western-north/bibiani-mine.jpg',
      category: 'mining',
      completionDate: '2023',
      region: 'Western North',
      client: 'Bibiani Gold Mine',
      coordinates: [6.469, -2.332]
    },
    {
      id: 26,
      title: 'Sefwi Wiawso District Boundary',
      location: 'Sefwi Wiawso',
      description: 'District boundary demarcation',
      equipment: 'GNSS RTK',
      image: '/images/projects/western-north/sefwi-boundary.jpg',
      category: 'cadastral',
      completionDate: '2014',
      region: 'Western North',
      client: 'Lands Commission',
      coordinates: [6.213, -2.497]
    },
    {
      id: 27,
      title: 'Chirano Gold Mine Expansion',
      location: 'Chirano',
      description: 'Open pit survey and volume calculations',
      equipment: 'Drone, Total Station',
      image: '/images/projects/western-north/chirano-mine.jpg',
      category: 'mining',
      completionDate: '2018',
      region: 'Western North',
      client: 'Kinross Gold',
      coordinates: [6.290, -2.387]
    },
    {
      id: 28,
      title: 'Bia National Park Boundary',
      location: 'Bia National Park',
      description: 'Forest boundary mapping and encroachment monitoring',
      equipment: 'Drone Photogrammetry',
      image: '/images/projects/western-north/bia-park.jpg',
      category: 'drone',
      completionDate: '2021',
      region: 'Western North',
      client: 'Forestry Commission',
      coordinates: [6.554, -3.082]
    },

    // Central Region (4 projects)
    {
      id: 29,
      title: 'Cape Coast Castle Precinct',
      location: 'Cape Coast',
      description: '3D laser scanning of historic fort',
      equipment: '3D Laser Scanner',
      image: '/images/projects/central/cape-coast-castle.jpg',
      category: 'heritage',
      completionDate: '2019',
      region: 'Central',
      client: 'Ghana Museums and Monuments Board',
      coordinates: [5.108, -1.245]
    },
    {
      id: 30,
      title: 'Winneba-Cape Coast Road Dualization',
      location: 'Winneba-Cape Coast Highway',
      description: '30km road corridor mapping',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/central/winneba-road.jpg',
      category: 'road',
      completionDate: '2022',
      region: 'Central',
      client: 'Ministry of Roads',
      coordinates: [5.230, -1.052]
    },
    {
      id: 31,
      title: 'University of Education Campus',
      location: 'Winneba',
      description: 'Campus expansion topographic mapping',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/central/uew-campus.jpg',
      category: 'topographic',
      completionDate: '2013',
      region: 'Central',
      client: 'UEW',
      coordinates: [5.348, -0.624]
    },
    {
      id: 32,
      title: 'Moree Fishing Harbour',
      location: 'Moree',
      description: 'Site layout for new fishing harbour',
      equipment: 'Total Station, GNSS RTK',
      image: '/images/projects/central/moree-harbour.jpg',
      category: 'construction',
      completionDate: '2016',
      region: 'Central',
      client: 'Ministry of Fisheries',
      coordinates: [5.123, -1.207]
    },

    // Eastern Region (4 projects)
    {
      id: 33,
      title: 'Akosombo Dam Monitoring',
      location: 'Akosombo',
      description: 'Structural deformation monitoring',
      equipment: 'Total Station, GNSS RTK',
      image: '/images/projects/eastern/akosombo-dam.jpg',
      category: 'engineering',
      completionDate: '2024',
      region: 'Eastern',
      client: 'VRA',
      coordinates: [6.301, 0.058]
    },
    {
      id: 34,
      title: 'Akyem Abuakwa Land Registration',
      location: 'Kibi',
      description: 'Systematic land title registration',
      equipment: 'GNSS RTK',
      image: '/images/projects/eastern/akyem-land.jpg',
      category: 'cadastral',
      completionDate: '2015',
      region: 'Eastern',
      client: 'Lands Commission',
      coordinates: [6.165, -0.552]
    },
    {
      id: 35,
      title: 'Kwahu Tafo-Adawso Road',
      location: 'Kwahu Tafo',
      description: '15km road corridor survey',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/eastern/kwahu-road.jpg',
      category: 'road',
      completionDate: '2018',
      region: 'Eastern',
      client: 'Department of Feeder Roads',
      coordinates: [6.535, -0.736]
    },
    {
      id: 36,
      title: 'Aburi Botanical Gardens',
      location: 'Aburi',
      description: 'Aerial mapping for garden restoration',
      equipment: 'Drone Photogrammetry',
      image: '/images/projects/eastern/aburi-gardens.jpg',
      category: 'drone',
      completionDate: '2020',
      region: 'Eastern',
      client: 'Department of Parks and Gardens',
      coordinates: [5.846, -0.179]
    },

    // Volta Region (4 projects)
    {
      id: 37,
      title: 'Ho-Denu Road Construction',
      location: 'Ho-Denu Road',
      description: '25km road alignment survey',
      equipment: 'GNSS RTK, Total Station',
      image: '/images/projects/volta/ho-denu.jpg',
      category: 'road',
      completionDate: '2023',
      region: 'Volta',
      client: 'Ministry of Roads',
      coordinates: [6.407, 0.464]
    },
    {
      id: 38,
      title: 'Keta Sea Defence Project',
      location: 'Keta',
      description: 'Coastal monitoring and sea defence survey',
      equipment: 'Drone, GNSS RTK',
      image: '/images/projects/volta/keta-defence.jpg',
      category: 'engineering',
      completionDate: '2017',
      region: 'Volta',
      client: 'Ministry of Works',
      coordinates: [5.918, 0.997]
    },
    {
      id: 39,
      title: 'Akosombo-Gyakiti Road',
      location: 'Gyakiti',
      description: 'Feeder road improvement survey',
      equipment: 'GNSS RTK',
      image: '/images/projects/volta/gyakiti-road.jpg',
      category: 'road',
      completionDate: '2012',
      region: 'Volta',
      client: 'Department of Feeder Roads',
      coordinates: [6.447, 0.095]
    },
    {
      id: 40,
      title: 'Wli Waterfall Tourist Site',
      location: 'Wli',
      description: 'Tourist facility development survey',
      equipment: 'Drone, GNSS RTK',
      image: '/images/projects/volta/wli-waterfall.jpg',
      category: 'topographic',
      completionDate: '2019',
      region: 'Volta',
      client: 'Tourism Development Authority',
      coordinates: [7.121, 0.598]
    },

    // Northern Region (4 projects)
    {
      id: 41,
      title: 'Tamale Outer Ring Road',
      location: 'Tamale',
      description: '15km ring road corridor mapping',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/northern/tamale-ring.jpg',
      category: 'road',
      completionDate: '2021',
      region: 'Northern',
      client: 'Ministry of Roads',
      coordinates: [9.404, -0.839]
    },
    {
      id: 42,
      title: 'Tamale International Airport',
      location: 'Tamale',
      description: 'Runway extension and terminal survey',
      equipment: 'GNSS RTK, Total Station',
      image: '/images/projects/northern/tamale-airport.jpg',
      category: 'construction',
      completionDate: '2014',
      region: 'Northern',
      client: 'Ghana Airports Company',
      coordinates: [9.557, -0.863]
    },
    {
      id: 43,
      title: 'Buipe Inland Port',
      location: 'Buipe',
      description: 'Port development feasibility survey',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/northern/buipe-port.jpg',
      category: 'topographic',
      completionDate: '2016',
      region: 'Northern',
      client: 'Ministry of Transport',
      coordinates: [8.777, -1.492]
    },
    {
      id: 44,
      title: 'Gbintiri-Nakpanduri Road',
      location: 'Nakpanduri',
      description: 'Rural road improvement survey',
      equipment: 'GNSS RTK',
      image: '/images/projects/northern/nakpanduri-road.jpg',
      category: 'road',
      completionDate: '2019',
      region: 'Northern',
      client: 'Department of Feeder Roads',
      coordinates: [10.570, -0.221]
    },

    // Upper East Region (3 projects)
    {
      id: 45,
      title: 'Navrongo-Tumu Road',
      location: 'Navrongo',
      description: 'Road corridor rehabilitation survey',
      equipment: 'GNSS RTK',
      image: '/images/projects/upper-east/navrongo-road.jpg',
      category: 'road',
      completionDate: '2015',
      region: 'Upper East',
      client: 'Ministry of Roads',
      coordinates: [10.886, -1.091]
    },
    {
      id: 46,
      title: 'Pwalugu Multi-Purpose Dam',
      location: 'Pwalugu',
      description: 'Dam site topographic survey',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/upper-east/pwalugu-dam.jpg',
      category: 'engineering',
      completionDate: '2020',
      region: 'Upper East',
      client: 'VRA',
      coordinates: [10.896, -0.880]
    },
    {
      id: 47,
      title: 'Tongo Hills Irrigation Project',
      location: 'Tongo',
      description: 'Irrigation scheme mapping',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/upper-east/tongo-irrigation.jpg',
      category: 'topographic',
      completionDate: '2013',
      region: 'Upper East',
      client: 'GIDA',
      coordinates: [10.722, -0.827]
    },

    // Upper West Region (3 projects)
    {
      id: 48,
      title: 'Wa-Tumu-Han Road',
      location: 'Wa-Tumu Road',
      description: '80km road corridor mapping',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/upper-west/wa-tumu.jpg',
      category: 'road',
      completionDate: '2022',
      region: 'Upper West',
      client: 'Ministry of Roads',
      coordinates: [10.060, -2.135]
    },
    {
      id: 49,
      title: 'Wechiau Hippo Sanctuary',
      location: 'Wechiau',
      description: 'Wildlife habitat mapping',
      equipment: 'Drone Photogrammetry',
      image: '/images/projects/upper-west/wechiau.jpg',
      category: 'drone',
      completionDate: '2017',
      region: 'Upper West',
      client: 'Wildlife Division',
      coordinates: [9.812, -2.695]
    },
    {
      id: 50,
      title: 'Jirapa District Hospital',
      location: 'Jirapa',
      description: 'New hospital construction layout',
      equipment: 'Total Station',
      image: '/images/projects/upper-west/jirapa-hospital.jpg',
      category: 'construction',
      completionDate: '2023',
      region: 'Upper West',
      client: 'Ministry of Health',
      coordinates: [10.574, -2.697]
    },

    // Bono Region (3 projects)
    {
      id: 51,
      title: 'Sunyani Outer Ring Road',
      location: 'Sunyani',
      description: 'Ring road corridor survey',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/bono/sunyani-ring.jpg',
      category: 'road',
      completionDate: '2020',
      region: 'Bono',
      client: 'Ministry of Roads',
      coordinates: [7.345, -2.326]
    },
    {
      id: 52,
      title: 'Sampa-Jinijini Road',
      location: 'Sampa',
      description: 'Road improvement survey',
      equipment: 'GNSS RTK',
      image: '/images/projects/bono/sampa-road.jpg',
      category: 'road',
      completionDate: '2014',
      region: 'Bono',
      client: 'Department of Feeder Roads',
      coordinates: [7.967, -2.732]
    },
    {
      id: 53,
      title: 'Bui National Park Boundary',
      location: 'Bui National Park',
      description: 'Park boundary demarcation',
      equipment: 'Drone, GNSS RTK',
      image: '/images/projects/bono/bui-park.jpg',
      category: 'drone',
      completionDate: '2018',
      region: 'Bono',
      client: 'Forestry Commission',
      coordinates: [8.272, -2.356]
    },

    // Bono East Region (2 projects)
    {
      id: 54,
      title: 'Techiman Market Redevelopment',
      location: 'Techiman',
      description: 'Market expansion site layout',
      equipment: 'Total Station',
      image: '/images/projects/bono-east/techiman-market.jpg',
      category: 'construction',
      completionDate: '2021',
      region: 'Bono East',
      client: 'Techiman Municipal Assembly',
      coordinates: [7.591, -1.934]
    },
    {
      id: 55,
      title: 'Kintampo Waterfalls',
      location: 'Kintampo',
      description: 'Tourist site development survey',
      equipment: 'Drone, GNSS RTK',
      image: '/images/projects/bono-east/kintampo-falls.jpg',
      category: 'topographic',
      completionDate: '2015',
      region: 'Bono East',
      client: 'Tourism Development Authority',
      coordinates: [8.054, -1.716]
    },

    // Ahafo Region (2 projects)
    {
      id: 56,
      title: 'Kenyaasi Gold Mine',
      location: 'Kenyaasi',
      description: 'Open pit mine survey',
      equipment: 'Drone, GNSS RTK, Total Station',
      image: '/images/projects/ahafo/kenyaasi-mine.jpg',
      category: 'mining',
      completionDate: '2022',
      region: 'Ahafo',
      client: 'Newmont Ghana',
      coordinates: [7.003, -2.482]
    },
    {
      id: 57,
      title: 'Goaso Municipal Boundary Survey',
      location: 'Goaso',
      description: 'Municipal boundary demarcation and land registration',
      equipment: 'GNSS RTK',
      image: '/images/projects/ahafo/goaso-boundary.jpg',
      category: 'cadastral',
      completionDate: '2016',
      region: 'Ahafo',
      client: 'Goaso Municipal Assembly',
      coordinates: [6.804, -2.517]
    },

    // Oti Region (2 projects)
    {
      id: 58,
      title: 'Dambai Township Layout',
      location: 'Dambai',
      description: 'New township layout and land registration',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/oti/dambai-layout.jpg',
      category: 'cadastral',
      completionDate: '2019',
      region: 'Oti',
      client: 'Dambai Municipal Assembly',
      coordinates: [8.059, 0.180]
    },
    {
      id: 59,
      title: 'Jasikan - Kpassa Road Survey',
      location: 'Jasikan',
      description: 'Road corridor mapping for improvement',
      equipment: 'GNSS RTK',
      image: '/images/projects/oti/jasikan-road.jpg',
      category: 'road',
      completionDate: '2013',
      region: 'Oti',
      client: 'Department of Feeder Roads',
      coordinates: [7.404, 0.470]
    },

    // Savannah Region (2 projects)
    {
      id: 60,
      title: 'Damongo Township Expansion',
      location: 'Damongo',
      description: 'Residential layout and land registration',
      equipment: 'GNSS RTK, Drone',
      image: '/images/projects/savannah/damongo-layout.jpg',
      category: 'cadastral',
      completionDate: '2020',
      region: 'Savannah',
      client: 'Damongo Municipal Assembly',
      coordinates: [9.081, -1.819]
    },
    {
      id: 61,
      title: 'Mole National Park Boundary',
      location: 'Mole National Park',
      description: 'Park boundary demarcation and mapping',
      equipment: 'Drone, GNSS RTK',
      image: '/images/projects/savannah/mole-park.jpg',
      category: 'drone',
      completionDate: '2015',
      region: 'Savannah',
      client: 'Wildlife Division',
      coordinates: [9.418, -1.853]
    },

    // North East Region (2 projects)
    {
      id: 62,
      title: 'Nalerigu Township Survey',
      location: 'Nalerigu',
      description: 'Municipal boundary and land registration',
      equipment: 'GNSS RTK',
      image: '/images/projects/north-east/nalerigu.jpg',
      category: 'cadastral',
      completionDate: '2018',
      region: 'North East',
      client: 'Nalerigu Municipal Assembly',
      coordinates: [10.530, -0.369]
    },
    {
      id: 63,
      title: 'Gambaga Escarpment Mapping',
      location: 'Gambaga',
      description: 'Topographic mapping for development planning',
      equipment: 'Drone, GNSS RTK',
      image: '/images/projects/north-east/gambaga.jpg',
      category: 'topographic',
      completionDate: '2021',
      region: 'North East',
      client: 'Regional Planning Committee',
      coordinates: [10.532, -0.439]
    }
  ];

  // Get unique categories for filter
  const categories = ['all', ...new Set(projects.map(p => p.category))];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-16">
        <div className="container-custom text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Projects
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Explore our portfolio of {projects.length} successful surveying projects spanning 15 years across all 16 regions of Ghana
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <ProjectFilter 
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            categories={categories}
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-accent">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectsPage;