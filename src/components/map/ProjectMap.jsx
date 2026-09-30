import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Fix for Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different project types
const getMarkerIcon = (type) => {
  const iconSize = [25, 41];
  const iconAnchor = [12, 41];
  
  // Color coding based on project type
  let color = 'red';
  if (type === 'mining') color = 'orange';
  if (type === 'road' || type === 'construction') color = 'blue';
  if (type === 'cadastral') color = 'red';
  if (type === 'topographic') color = 'green';
  if (type === 'drone') color = 'purple';
  if (type === 'engineering') color = 'yellow';
  if (type === 'heritage') color = 'pink';
  
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Component to fly to a location when a project is clicked
const FlyToLocation = ({ coordinates, shouldFly }) => {
  const map = useMap();
  
  useEffect(() => {
    if (shouldFly && coordinates) {
      map.flyTo(coordinates, 14, {
        animate: true,
        duration: 2
      });
    }
  }, [shouldFly, coordinates, map]);
  
  return null;
};

const ProjectMap = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [shouldFly, setShouldFly] = useState(false);
  
  const mapSectionRef = useRef(null);

  // All 63 projects synced with ProjectsPage
  const mockProjects = [
    // Greater Accra Region (7 projects)
    {
      id: 1,
      title: 'East Legon Residential Development',
      location: 'East Legon, Accra',
      coordinates: [5.627, -0.168],
      type: 'cadastral',
      year: '2024',
      description: 'Boundary survey for 50-acre luxury residential development',
      region: 'Greater Accra',
      client: 'Devtraco Properties',
      equipment: 'GNSS RTK, Total Station'
    },
    {
      id: 2,
      title: 'Tema Port Expansion Phase 1',
      location: 'Tema',
      coordinates: [5.669, 0.016],
      type: 'construction',
      year: '2018',
      description: 'Site layout and monitoring for port expansion project',
      region: 'Greater Accra',
      client: 'GPHA',
      equipment: 'Total Station, 3D Laser Scanner'
    },
    {
      id: 3,
      title: 'Airport City Commercial Complex',
      location: 'Airport City, Accra',
      coordinates: [5.597, -0.187],
      type: 'topographic',
      year: '2021',
      description: 'Topographic mapping for new shopping mall development',
      region: 'Greater Accra',
      client: 'Delwen Limited',
      equipment: 'Drone, GNSS RTK'
    },
    {
      id: 4,
      title: 'Kaneshi Estate Redevelopment',
      location: 'Kaneshi, Accra',
      coordinates: [5.571, -0.210],
      type: 'construction',
      year: '2015',
      description: 'Redevelopment survey for 500 housing units',
      region: 'Greater Accra',
      client: 'State Housing Company',
      equipment: 'GNSS RTK, Total Station'
    },
    {
      id: 5,
      title: 'Ada Coastal Erosion Study',
      location: 'Ada Foah',
      coordinates: [5.783, 0.633],
      type: 'drone',
      year: '2022',
      description: 'Aerial mapping for coastal erosion monitoring',
      region: 'Greater Accra',
      client: 'Hydrological Services Department',
      equipment: 'Drone Photogrammetry'
    },
    {
      id: 6,
      title: 'Accra Digital Centre',
      location: 'Ring Road, Accra',
      coordinates: [5.579, -0.204],
      type: 'construction',
      year: '2019',
      description: 'Construction layout for office complex',
      region: 'Greater Accra',
      client: 'Ministry of Communications',
      equipment: 'Total Station'
    },
    {
      id: 7,
      title: 'Weija Dam Rehabilitation',
      location: 'Weija',
      coordinates: [5.571, -0.330],
      type: 'engineering',
      year: '2013',
      description: 'Dam wall monitoring and volume calculations',
      region: 'Greater Accra',
      client: 'GWCL',
      equipment: '3D Laser Scanner, Drone'
    },

    // Ashanti Region (6 projects)
    {
      id: 8,
      title: 'Kejetia Market Redevelopment Phase 1',
      location: 'Kejetia, Kumasi',
      coordinates: [6.697, -1.620],
      type: 'construction',
      year: '2016',
      description: 'Site layout for market expansion',
      region: 'Ashanti',
      client: 'KMA',
      equipment: 'Total Station, GNSS RTK'
    },
    {
      id: 9,
      title: 'Nyinahin Bauxite Mine Development',
      location: 'Nyinahin, Ashanti Region',
      coordinates: [6.950, -2.100],
      type: 'mining',
      year: '2023',
      description: 'Mine site topography and volume calculations',
      region: 'Ashanti',
      client: 'GIADEC',
      equipment: 'Drone, GNSS RTK, Total Station'
    },
    {
      id: 10,
      title: 'KNUST Campus Expansion',
      location: 'KNUST, Kumasi',
      coordinates: [6.687, -1.571],
      type: 'topographic',
      year: '2014',
      description: 'Topographic mapping for new faculty buildings',
      region: 'Ashanti',
      client: 'KNUST',
      equipment: 'GNSS RTK, Drone'
    },
    {
      id: 11,
      title: 'Asokwa Industrial Zone',
      location: 'Asokwa, Kumasi',
      coordinates: [6.664, -1.608],
      type: 'cadastral',
      year: '2017',
      description: 'Land registration for 20 industrial plots',
      region: 'Ashanti',
      client: 'Kumasi Industrial Park',
      equipment: 'GNSS RTK'
    },
    {
      id: 12,
      title: 'Lake Bosomtwe Shoreline Mapping',
      location: 'Lake Bosomtwe',
      coordinates: [6.508, -1.422],
      type: 'drone',
      year: '2020',
      description: 'Aerial mapping of lake perimeter and encroachment',
      region: 'Ashanti',
      client: 'EPA',
      equipment: 'Drone Photogrammetry'
    },
    {
      id: 13,
      title: 'Obuasi Gold Mine Infrastructure',
      location: 'Obuasi',
      coordinates: [6.204, -1.672],
      type: 'mining',
      year: '2012',
      description: 'Underground and surface survey for mine expansion',
      region: 'Ashanti',
      client: 'AngloGold Ashanti',
      equipment: '3D Laser Scanner, Total Station'
    },

    // Western Region - ENHANCED (10 projects)
    {
      id: 14,
      title: 'Takoradi Port Expansion',
      location: 'Takoradi',
      coordinates: [4.877, -1.757],
      type: 'construction',
      year: '2019',
      description: 'Bathymetric survey for new berth construction',
      region: 'Western',
      client: 'GPHA',
      equipment: 'Multibeam Echo Sounder, GNSS RTK'
    },
    // TARKWA MUNICIPALITY - CADASTRAL SURVEYS
    {
      id: 15,
      title: 'Tarkwa Town Boundary Demarcation',
      location: 'Tarkwa Municipality',
      coordinates: [5.306, -1.989],
      type: 'cadastral',
      year: '2010',
      description: 'Comprehensive boundary survey for municipal expansion',
      region: 'Western',
      client: 'Tarkwa Municipal Assembly',
      equipment: 'GNSS RTK, Total Station'
    },
    {
      id: 16,
      title: 'Tarkwa - Aboso Road Corridor Land Registration',
      location: 'Tarkwa-Aboso Highway',
      coordinates: [5.317, -1.968],
      type: 'cadastral',
      year: '2018',
      description: 'Systematic land title registration along highway corridor',
      region: 'Western',
      client: 'Lands Commission - Western Region',
      equipment: 'GNSS RTK, GPS Data Collectors'
    },
    {
      id: 17,
      title: 'University of Mines and Technology Land Survey',
      location: 'UMaT, Tarkwa',
      coordinates: [5.301, -1.998],
      type: 'cadastral',
      year: '2015',
      description: 'Campus boundary and facility mapping',
      region: 'Western',
      client: 'UMaT',
      equipment: 'GNSS RTK, Total Station'
    },
    {
      id: 18,
      title: 'Tarkwa Industrial Area Plot Registration',
      location: 'Tarkwa Industrial Zone',
      coordinates: [5.312, -1.979],
      type: 'cadastral',
      year: '2021',
      description: 'Cadastral survey for 50 industrial plots',
      region: 'Western',
      client: 'Tarkwa Industrial Development',
      equipment: 'GNSS RTK'
    },
    // WASSA AGONA MUNICIPALITY - CADASTRAL SURVEYS
    {
      id: 19,
      title: 'Wassa Agona Township Expansion',
      location: 'Wassa Agona',
      coordinates: [5.527, -1.912],
      type: 'cadastral',
      year: '2022',
      description: 'Boundary survey for new residential areas',
      region: 'Western',
      client: 'Wassa Agona Municipal Assembly',
      equipment: 'GNSS RTK, Drone'
    },
    {
      id: 20,
      title: 'Agona - Nsuaem Road Land Registration',
      location: 'Agona Nsuaem',
      coordinates: [5.541, -1.928],
      type: 'cadastral',
      year: '2016',
      description: 'Property boundary demarcation along highway',
      region: 'Western',
      client: 'Lands Commission',
      equipment: 'GNSS RTK'
    },
    {
      id: 21,
      title: 'Nsuaem Commercial Area Cadastre',
      location: 'Nsuaem, Western Region',
      coordinates: [5.557, -1.941],
      type: 'cadastral',
      year: '2013',
      description: 'Commercial property registration and mapping',
      region: 'Western',
      client: 'Nsuaem Traditional Council',
      equipment: 'GNSS RTK, Total Station'
    },
    {
      id: 22,
      title: 'Essiama Palm Plantation',
      location: 'Essiama, Western Region',
      coordinates: [4.944, -2.222],
      type: 'topographic',
      year: '2017',
      description: 'Large-scale topographic mapping for oil palm plantation',
      region: 'Western',
      client: 'Benso Oil Palm Plantation',
      equipment: 'Drone, GNSS RTK'
    },
    {
      id: 23,
      title: 'Nzema Gold Exploration',
      location: 'Nzema, Western Region',
      coordinates: [4.833, -2.267],
      type: 'mining',
      year: '2011',
      description: 'Exploration grid and geological mapping',
      region: 'Western',
      client: 'Endeavour Mining',
      equipment: 'GNSS RTK, GIS Software'
    },
    {
      id: 24,
      title: 'Axim Beach Resort Development',
      location: 'Axim',
      coordinates: [4.867, -2.242],
      type: 'topographic',
      year: '2020',
      description: 'Topographic and boundary survey for resort',
      region: 'Western',
      client: 'Axim Beach Resort',
      equipment: 'GNSS RTK, Drone'
    },

    // Western North Region (4 projects)
    {
      id: 25,
      title: 'Bibiani Gold Mine Survey',
      location: 'Bibiani',
      coordinates: [6.469, -2.332],
      type: 'mining',
      year: '2023',
      description: 'Pit volume calculations and wall stability monitoring',
      region: 'Western North',
      client: 'Bibiani Gold Mine',
      equipment: '3D Laser Scanner, Drone'
    },
    {
      id: 26,
      title: 'Sefwi Wiawso District Boundary',
      location: 'Sefwi Wiawso',
      coordinates: [6.213, -2.497],
      type: 'cadastral',
      year: '2014',
      description: 'District boundary demarcation',
      region: 'Western North',
      client: 'Lands Commission',
      equipment: 'GNSS RTK'
    },
    {
      id: 27,
      title: 'Chirano Gold Mine Expansion',
      location: 'Chirano',
      coordinates: [6.290, -2.387],
      type: 'mining',
      year: '2018',
      description: 'Open pit survey and volume calculations',
      region: 'Western North',
      client: 'Kinross Gold',
      equipment: 'Drone, Total Station'
    },
    {
      id: 28,
      title: 'Bia National Park Boundary',
      location: 'Bia National Park',
      coordinates: [6.554, -3.082],
      type: 'drone',
      year: '2021',
      description: 'Forest boundary mapping and encroachment monitoring',
      region: 'Western North',
      client: 'Forestry Commission',
      equipment: 'Drone Photogrammetry'
    },

    // Central Region (4 projects)
    {
      id: 29,
      title: 'Cape Coast Castle Precinct',
      location: 'Cape Coast',
      coordinates: [5.108, -1.245],
      type: 'heritage',
      year: '2019',
      description: '3D laser scanning of historic fort',
      region: 'Central',
      client: 'Ghana Museums and Monuments Board',
      equipment: '3D Laser Scanner'
    },
    {
      id: 30,
      title: 'Winneba-Cape Coast Road Dualization',
      location: 'Winneba-Cape Coast Highway',
      coordinates: [5.230, -1.052],
      type: 'road',
      year: '2022',
      description: '30km road corridor mapping',
      region: 'Central',
      client: 'Ministry of Roads',
      equipment: 'GNSS RTK, Drone'
    },
    {
      id: 31,
      title: 'University of Education Campus',
      location: 'Winneba',
      coordinates: [5.348, -0.624],
      type: 'topographic',
      year: '2013',
      description: 'Campus expansion topographic mapping',
      region: 'Central',
      client: 'UEW',
      equipment: 'GNSS RTK, Drone'
    },
    {
      id: 32,
      title: 'Moree Fishing Harbour',
      location: 'Moree',
      coordinates: [5.123, -1.207],
      type: 'construction',
      year: '2016',
      description: 'Site layout for new fishing harbour',
      region: 'Central',
      client: 'Ministry of Fisheries',
      equipment: 'Total Station, GNSS RTK'
    },

    // Eastern Region (4 projects)
    {
      id: 33,
      title: 'Akosombo Dam Monitoring',
      location: 'Akosombo',
      coordinates: [6.301, 0.058],
      type: 'engineering',
      year: '2024',
      description: 'Structural deformation monitoring',
      region: 'Eastern',
      client: 'VRA',
      equipment: 'Total Station, GNSS RTK'
    },
    {
      id: 34,
      title: 'Akyem Abuakwa Land Registration',
      location: 'Kibi',
      coordinates: [6.165, -0.552],
      type: 'cadastral',
      year: '2015',
      description: 'Systematic land title registration',
      region: 'Eastern',
      client: 'Lands Commission',
      equipment: 'GNSS RTK'
    },
    {
      id: 35,
      title: 'Kwahu Tafo-Adawso Road',
      location: 'Kwahu Tafo',
      coordinates: [6.535, -0.736],
      type: 'road',
      year: '2018',
      description: '15km road corridor survey',
      region: 'Eastern',
      client: 'Department of Feeder Roads',
      equipment: 'GNSS RTK, Drone'
    },
    {
      id: 36,
      title: 'Aburi Botanical Gardens',
      location: 'Aburi',
      coordinates: [5.846, -0.179],
      type: 'drone',
      year: '2020',
      description: 'Aerial mapping for garden restoration',
      region: 'Eastern',
      client: 'Department of Parks and Gardens',
      equipment: 'Drone Photogrammetry'
    },

    // Volta Region (4 projects)
    {
      id: 37,
      title: 'Ho-Denu Road Construction',
      location: 'Ho-Denu Road',
      coordinates: [6.407, 0.464],
      type: 'road',
      year: '2023',
      description: '25km road alignment survey',
      region: 'Volta',
      client: 'Ministry of Roads',
      equipment: 'GNSS RTK, Total Station'
    },
    {
      id: 38,
      title: 'Keta Sea Defence Project',
      location: 'Keta',
      coordinates: [5.918, 0.997],
      type: 'engineering',
      year: '2017',
      description: 'Coastal monitoring and sea defence survey',
      region: 'Volta',
      client: 'Ministry of Works',
      equipment: 'Drone, GNSS RTK'
    },
    {
      id: 39,
      title: 'Akosombo-Gyakiti Road',
      location: 'Gyakiti',
      coordinates: [6.447, 0.095],
      type: 'road',
      year: '2012',
      description: 'Feeder road improvement survey',
      region: 'Volta',
      client: 'Department of Feeder Roads',
      equipment: 'GNSS RTK'
    },
    {
      id: 40,
      title: 'Wli Waterfall Tourist Site',
      location: 'Wli',
      coordinates: [7.121, 0.598],
      type: 'topographic',
      year: '2019',
      description: 'Tourist facility development survey',
      region: 'Volta',
      client: 'Tourism Development Authority',
      equipment: 'Drone, GNSS RTK'
    },

    // Northern Region (4 projects)
    {
      id: 41,
      title: 'Tamale Outer Ring Road',
      location: 'Tamale',
      coordinates: [9.404, -0.839],
      type: 'road',
      year: '2021',
      description: '15km ring road corridor mapping',
      region: 'Northern',
      client: 'Ministry of Roads',
      equipment: 'GNSS RTK, Drone'
    },
    {
      id: 42,
      title: 'Tamale International Airport',
      location: 'Tamale',
      coordinates: [9.557, -0.863],
      type: 'construction',
      year: '2014',
      description: 'Runway extension and terminal survey',
      region: 'Northern',
      client: 'Ghana Airports Company',
      equipment: 'GNSS RTK, Total Station'
    },
    {
      id: 43,
      title: 'Buipe Inland Port',
      location: 'Buipe',
      coordinates: [8.777, -1.492],
      type: 'topographic',
      year: '2016',
      description: 'Port development feasibility survey',
      region: 'Northern',
      client: 'Ministry of Transport',
      equipment: 'GNSS RTK, Drone'
    },
    {
      id: 44,
      title: 'Gbintiri-Nakpanduri Road',
      location: 'Nakpanduri',
      coordinates: [10.570, -0.221],
      type: 'road',
      year: '2019',
      description: 'Rural road improvement survey',
      region: 'Northern',
      client: 'Department of Feeder Roads',
      equipment: 'GNSS RTK'
    },

    // Upper East Region (3 projects)
    {
      id: 45,
      title: 'Navrongo-Tumu Road',
      location: 'Navrongo',
      coordinates: [10.886, -1.091],
      type: 'road',
      year: '2015',
      description: 'Road corridor rehabilitation survey',
      region: 'Upper East',
      client: 'Ministry of Roads',
      equipment: 'GNSS RTK'
    },
    {
      id: 46,
      title: 'Pwalugu Multi-Purpose Dam',
      location: 'Pwalugu',
      coordinates: [10.896, -0.880],
      type: 'engineering',
      year: '2020',
      description: 'Dam site topographic survey',
      region: 'Upper East',
      client: 'VRA',
      equipment: 'GNSS RTK, Drone'
    },
    {
      id: 47,
      title: 'Tongo Hills Irrigation Project',
      location: 'Tongo',
      coordinates: [10.722, -0.827],
      type: 'topographic',
      year: '2013',
      description: 'Irrigation scheme mapping',
      region: 'Upper East',
      client: 'GIDA',
      equipment: 'GNSS RTK, Drone'
    },

    // Upper West Region (3 projects)
    {
      id: 48,
      title: 'Wa-Tumu-Han Road',
      location: 'Wa-Tumu Road',
      coordinates: [10.060, -2.135],
      type: 'road',
      year: '2022',
      description: '80km road corridor mapping',
      region: 'Upper West',
      client: 'Ministry of Roads',
      equipment: 'GNSS RTK, Drone'
    },
    {
      id: 49,
      title: 'Wechiau Hippo Sanctuary',
      location: 'Wechiau',
      coordinates: [9.812, -2.695],
      type: 'drone',
      year: '2017',
      description: 'Wildlife habitat mapping',
      region: 'Upper West',
      client: 'Wildlife Division',
      equipment: 'Drone Photogrammetry'
    },
    {
      id: 50,
      title: 'Jirapa District Hospital',
      location: 'Jirapa',
      coordinates: [10.574, -2.697],
      type: 'construction',
      year: '2023',
      description: 'New hospital construction layout',
      region: 'Upper West',
      client: 'Ministry of Health',
      equipment: 'Total Station'
    },

    // Bono Region (3 projects)
    {
      id: 51,
      title: 'Sunyani Outer Ring Road',
      location: 'Sunyani',
      coordinates: [7.345, -2.326],
      type: 'road',
      year: '2020',
      description: 'Ring road corridor survey',
      region: 'Bono',
      client: 'Ministry of Roads',
      equipment: 'GNSS RTK, Drone'
    },
    {
      id: 52,
      title: 'Sampa-Jinijini Road',
      location: 'Sampa',
      coordinates: [7.967, -2.732],
      type: 'road',
      year: '2014',
      description: 'Road improvement survey',
      region: 'Bono',
      client: 'Department of Feeder Roads',
      equipment: 'GNSS RTK'
    },
    {
      id: 53,
      title: 'Bui National Park Boundary',
      location: 'Bui National Park',
      coordinates: [8.272, -2.356],
      type: 'drone',
      year: '2018',
      description: 'Park boundary demarcation',
      region: 'Bono',
      client: 'Forestry Commission',
      equipment: 'Drone, GNSS RTK'
    },

    // Bono East Region (2 projects)
    {
      id: 54,
      title: 'Techiman Market Redevelopment',
      location: 'Techiman',
      coordinates: [7.591, -1.934],
      type: 'construction',
      year: '2021',
      description: 'Market expansion site layout',
      region: 'Bono East',
      client: 'Techiman Municipal Assembly',
      equipment: 'Total Station'
    },
    {
      id: 55,
      title: 'Kintampo Waterfalls',
      location: 'Kintampo',
      coordinates: [8.054, -1.716],
      type: 'topographic',
      year: '2015',
      description: 'Tourist site development survey',
      region: 'Bono East',
      client: 'Tourism Development Authority',
      equipment: 'Drone, GNSS RTK'
    },

    // Ahafo Region (2 projects)
    {
      id: 56,
      title: 'Kenyaasi Gold Mine',
      location: 'Kenyaasi',
      coordinates: [7.003, -2.482],
      type: 'mining',
      year: '2022',
      description: 'Open pit mine survey',
      region: 'Ahafo',
      client: 'Newmont Ghana',
      equipment: 'Drone, GNSS RTK, Total Station'
    },
    {
      id: 57,
      title: 'Goaso Municipal Boundary Survey',
      location: 'Goaso',
      coordinates: [6.804, -2.517],
      type: 'cadastral',
      year: '2016',
      description: 'Municipal boundary demarcation and land registration',
      region: 'Ahafo',
      client: 'Goaso Municipal Assembly',
      equipment: 'GNSS RTK'
    },

    // Oti Region (2 projects)
    {
      id: 58,
      title: 'Dambai Township Layout',
      location: 'Dambai',
      coordinates: [8.059, 0.180],
      type: 'cadastral',
      year: '2019',
      description: 'New township layout and land registration',
      region: 'Oti',
      client: 'Dambai Municipal Assembly',
      equipment: 'GNSS RTK, Drone'
    },
    {
      id: 59,
      title: 'Jasikan - Kpassa Road Survey',
      location: 'Jasikan',
      coordinates: [7.404, 0.470],
      type: 'road',
      year: '2013',
      description: 'Road corridor mapping for improvement',
      region: 'Oti',
      client: 'Department of Feeder Roads',
      equipment: 'GNSS RTK'
    },

    // Savannah Region (2 projects)
    {
      id: 60,
      title: 'Damongo Township Expansion',
      location: 'Damongo',
      coordinates: [9.081, -1.819],
      type: 'cadastral',
      year: '2020',
      description: 'Residential layout and land registration',
      region: 'Savannah',
      client: 'Damongo Municipal Assembly',
      equipment: 'GNSS RTK, Drone'
    },
    {
      id: 61,
      title: 'Mole National Park Boundary',
      location: 'Mole National Park',
      coordinates: [9.418, -1.853],
      type: 'drone',
      year: '2015',
      description: 'Park boundary demarcation and mapping',
      region: 'Savannah',
      client: 'Wildlife Division',
      equipment: 'Drone, GNSS RTK'
    },

    // North East Region (2 projects)
    {
      id: 62,
      title: 'Nalerigu Township Survey',
      location: 'Nalerigu',
      coordinates: [10.530, -0.369],
      type: 'cadastral',
      year: '2018',
      description: 'Municipal boundary and land registration',
      region: 'North East',
      client: 'Nalerigu Municipal Assembly',
      equipment: 'GNSS RTK'
    },
    {
      id: 63,
      title: 'Gambaga Escarpment Mapping',
      location: 'Gambaga',
      coordinates: [10.532, -0.439],
      type: 'topographic',
      year: '2021',
      description: 'Topographic mapping for development planning',
      region: 'North East',
      client: 'Regional Planning Committee',
      equipment: 'Drone, GNSS RTK'
    }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Try to fetch from API
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
      if (response.data && response.data.data && response.data.data.length > 0) {
        setProjects(response.data.data);
      } else {
        // If no data, use mock data
        console.log('No projects from API, using mock data');
        setProjects(mockProjects);
        setUseMockData(true);
      }
    } catch (error) {
      console.error('Error fetching projects, using mock data:', error);
      // If API fails, use mock data
      setProjects(mockProjects);
      setUseMockData(true);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setSelectedCoordinates(project.coordinates);
    setShouldFly(true);
    
    // Scroll to map section
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    
    // Reset the fly trigger after animation starts
    setTimeout(() => {
      setShouldFly(false);
    }, 500);
  };

  // Ghana bounds
  const ghanaBounds = [
    [4.5, -3.5], // Southwest coordinates
    [11.5, 1.5], // Northeast coordinates
  ];

  if (loading) {
    return (
      <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Map Section with ref */}
      <div ref={mapSectionRef} className="scroll-mt-24">
        <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 relative">
          <MapContainer
            bounds={ghanaBounds}
            style={{ height: '100%', width: '100%' }}
            zoom={6}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {selectedCoordinates && <FlyToLocation coordinates={selectedCoordinates} shouldFly={shouldFly} />}
            
            {projects.map((project) => (
              <Marker 
                key={project.id} 
                position={project.coordinates}
                icon={getMarkerIcon(project.type)}
                eventHandlers={{
                  click: () => {
                    setSelectedProject(project);
                    setSelectedCoordinates(project.coordinates);
                  }
                }}
              >
                <Popup>
                  <div className="p-2 max-w-xs">
                    <h3 className="font-bold text-primary text-lg mb-1">{project.title}</h3>
                    <p className="text-sm text-accent mb-2">{project.location}</p>
                    <p className="text-sm mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                      </span>
                      <span className="text-xs bg-gray-100 text-accent px-2 py-1 rounded-full">
                        {project.year}
                      </span>
                    </div>
                    {project.client && (
                      <p className="text-xs mt-2 text-accent">
                        <strong>Client:</strong> {project.client}
                      </p>
                    )}
                    {project.equipment && (
                      <p className="text-xs mt-1 text-accent">
                        <strong>Equipment:</strong> {project.equipment}
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg text-xs z-[1000]">
            <p className="font-semibold mb-2">Project Types:</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span>Cadastral / Boundary</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span>Road / Construction</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span>Topographic</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                <span>Mining</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span>Drone / Aerial</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span>Engineering</span>
              </div>
            </div>
          </div>

          {/* Project Count */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg text-xs z-[1000]">
            <span className="font-semibold">{projects.length}</span> Projects (2010-2024)
          </div>
        </div>
      </div>

      {/* Project List - Click to scroll to map and zoom */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Featured Projects ({projects.length})</h3>
          <p className="text-sm text-primary animate-pulse">👇 Click any project to view on map</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto p-2">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`bg-white p-4 rounded-lg shadow border cursor-pointer transition-all hover:shadow-md transform hover:-translate-y-1 ${
                selectedProject?.id === project.id 
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
                  : 'border-gray-100 hover:border-primary/50'
              }`}
              onClick={() => handleProjectClick(project)}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-primary">{project.title}</h4>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {project.region}
                </span>
              </div>
              <p className="text-sm text-accent mt-1">{project.location}</p>
              <p className="text-xs mt-2 text-gray-600 line-clamp-2">{project.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs bg-gray-100 text-accent px-2 py-1 rounded">
                  {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                </span>
                <span className="text-xs text-accent">{project.year}</span>
              </div>
              {selectedProject?.id === project.id && (
                <div className="mt-2 text-xs text-primary font-semibold flex items-center gap-1">
                  <span>📍</span> Currently viewing on map
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {useMockData && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
          <p className="text-sm">
            <strong>Note:</strong> Showing {projects.length} sample projects across all 16 regions (2010-2024). Connect your backend API to display real projects.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectMap;