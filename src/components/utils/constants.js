import * as Yup from 'yup';
import { head } from 'lodash';

export const getRoodFormInitialStates = ({ formData }) => {
  return {
    comment: head(formData?.comments?.data)?.comment || '',
    inspectorFirstName: head(formData?.inspectorInformation?.data)?.inspectorFirstName || '',
    inspectorLastName: head(formData?.inspectorInformation?.data)?.inspectorLastName || '',
    inspectorPosition: head(formData?.inspectorInformation?.data)?.inspectorPosition || '',
    inspectorAreaCode: head(formData?.inspectorInformation?.data)?.inspectorAreaCode || '',
    inspectorPhoneNo: head(formData?.inspectorInformation?.data)?.inspectorPhoneNo || '',
    inspectorEmail: head(formData?.inspectorInformation?.data)?.inspectorEmail || '',
    inspectorInspectionDate: head(formData?.inspectorInformation?.data)?.inspectorInspectionDate || '',
  }
}

export const validationSchema = Yup.object().shape({
  inspectorFirstName: Yup.string().required('Inspector First Name is Required'),
  inspectorLastName: Yup.string().required('Inspector Last Name  is Required'),
  inspectorPosition: Yup.string().required('Inspector Posiion  is Required'),
  inspectorAreaCode: Yup.string().required('Inspector Area Code  is Required'),
  inspectorPhoneNo: Yup.string().required('Inspector Phone Number is Required'),
  inspectorEmail: Yup.string().required('Inspector Email is Required'),
  inspectorInspectionDate: Yup.string().required('Inspector Inspecion Date is Required'),
});

export const initialTableDataForTable_A = [
  { itemNo: 1, customText: 'Wind/Hail Damage', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 2, customText: 'Properly Installed', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 3, customText: 'Granule Loss', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 4, customText: 'Zippering (Loose Shingles)', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 5, customText: 'Missing / Damaged Shingles', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 6, customText: 'Missing / Damaged Ridge', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 7, customText: 'Bird Feces Damage', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 8, customText: 'Fish Lips', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 9, customText: 'Discoloration', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 10, customText: 'Delamination', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 11, customText: 'Exposed Nails', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 12, customText: 'Other', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
];
export const initialTableDataForTable_B = [
  { itemNo: 1, customText: 'Wind / Hail', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 2, customText: 'Properly Installed', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 3, customText: 'Lost or missing screws', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 4, customText: 'Proper Amount of Screws', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 5, customText: 'Inside / Outside Closure Installed', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 6, customText: 'Rust', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 7, customText: 'Other', status: false, location: '', correctiveAction: '', image: '', actualStatus: false }
];
export const initialTableDataForTable_C = [
  { itemNo: 1, customText: 'Wind / Hail', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 2, customText: 'Properly Installed', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 3, customText: 'Broken / Cracked Tile', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 4, customText: 'Missing Tile', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 5, customText: 'Properly Mortared', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 6, customText: 'Missing Ridge / Rake', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 7, customText: 'Exposed Underlayment', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 8, customText: 'Other', status: false, location: '', correctiveAction: '', image: '', actualStatus: false }
];
export const initialTableDataForTable_D = [
  { itemNo: 1, customText: 'Wind / Hail', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 2, customText: 'Properly Installed', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 3, customText: 'Missing / Damaged Shakes', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 4, customText: 'Missing / Damaged Ridge', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 5, customText: 'Exposed Underlayment', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 6, customText: 'Exposed Nails', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 7, customText: 'Other', status: false, location: '', correctiveAction: '', image: '', actualStatus: false }
];
export const initialTableDataForTable_E = [
  { itemNo: 1, customText: 'Wind / Hail', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 2, customText: 'Properly Installed', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 3, customText: 'Lost or Missing Screws', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 4, customText: 'Granule Loss', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 5, customText: 'Other', status: false, location: '', correctiveAction: '', image: '', actualStatus: false }
];
export const initialTableDataForTable_F = [
  { itemNo: 1, customText: 'Wind / Hail', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 2, customText: 'Bare Areas', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 3, customText: 'Cracked Felts', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 4, customText: 'Blistering', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 5, customText: 'Ponding', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 6, customText: 'Pulling From Edge Metal', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 7, customText: 'Pulling From Flashings', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 8, customText: 'Exposed Plysheets', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 9, customText: 'Other', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
];
export const initialTableDataForTable_G = [
  { itemNo: 1, customText: 'Wind / Hail', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 2, customText: 'Discoloration', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 3, customText: 'Cracking', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 4, customText: 'Wrinkles', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 5, customText: 'Granule Loss', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 6, customText: 'Blistering', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 7, customText: 'Loose Laps', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 8, customText: 'Fish Lips', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 9, customText: 'Ponding', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 10, customText: 'Exposed Nails', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 11, customText: 'Other', status: false, location: '', correctiveAction: '', image: '', actualStatus: false }
];
export const initialTableDataForTable_H = [
  { itemNo: 1, customText: 'Wind / Hail', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 2, customText: 'Punctures', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 3, customText: 'Walkpads Displaced', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 4, customText: 'Walkpads Deteriorated', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 5, customText: 'Cracking', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 6, customText: 'Open Joints', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 7, customText: 'Unadhered Patches', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 8, customText: 'Loose Insulation', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 9, customText: 'Fasteners Backing Out', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 10, customText: 'Deterioration / Discoloration', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 11, customText: 'Exposed scrim', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 12, customText: 'Ponding', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 13, customText: 'Other', status: false, location: '', correctiveAction: '', image: '', actualStatus: false }
];
export const initialTableDataForTable_J = [
  { itemNo: 1, customText: 'Base Flashings', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 2, customText: 'Wind / Hail', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 3, customText: 'Adhesion', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 4, customText: 'Tied In Correctly', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 5, customText: 'Vertical Laps Sealed', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 6, customText: 'Deterioration', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 7, customText: 'Punctures', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 8, customText: 'Sagging / Wrinkling', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 9, customText: 'Pulling Away from Wall', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 10, customText: 'Fabric Exposed ', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 11, customText: 'Is Wall Cap Installed', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 12, customText: 'Is Wall Cap Secure', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 13, customText: 'Is Wall Cap Waterproofed', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 14, customText: 'Other', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
];

export const initialTableDataForTable_AA = [
  { itemNo: 1, customText: 'Clear of Debris', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 2, customText: 'Sealed Properly', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 3, customText: 'Drain Secure', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 4, customText: 'Drain Cover Secure', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
];
export const initialTableDataForTable_BB = [
  { itemNo: 1, customText: 'A/C Crub / Duct Sealed', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 2, customText: 'A/C Crub / Duct Secure', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 3, customText: 'Drainline Installed Correctly', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
];

export const initialTableDataForTable_DD = [
  { itemNo: 1, customText: 'No data against this table found!', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  // { itemNo: 2, customText: 'Sealed Properly', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
  // { itemNo: 3, customText: 'Drain Secure', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
  // { itemNo: 4, customText: 'Drain Cover Secure', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
];
export const initialTableDataForTable_EE = [
  { itemNo: 1, customText: 'Blocks Installed', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 2, customText: 'Sealed Properly', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 3, customText: 'Drain Secure', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 4, customText: 'Drain Cover Secure', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
];
export const initialTableDataForTable_FF = [
  { itemNo: 1, customText: 'Blocks Installed', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  // { itemNo: 2, customText: 'Sealed Properly', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
  // { itemNo: 3, customText: 'Drain Secure', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
  // { itemNo: 4, customText: 'Drain Cover Secure', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
];
export const initialTableDataForTable_GG = [
  { itemNo: 1, customText: 'Blocks Installed', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  // { itemNo: 2, customText: 'Sealed Properly', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
  // { itemNo: 3, customText: 'Drain Secure', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
  // { itemNo: 4, customText: 'Drain Cover Secure', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
];
export const initialTableDataForTable_HH = [
  { itemNo: 1, customText: 'Satellite Dish Sealed', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  // { itemNo: 2, customText: 'Sealed Properly', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
  // { itemNo: 3, customText: 'Drain Secure', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
  // { itemNo: 4, customText: 'Drain Cover Secure', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
];
export const initialTableDataForTable_II = [
  { itemNo: 1, customText: 'Clean of Debris', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  // { itemNo: 2, customText: 'Sealed Properly', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
  // { itemNo: 3, customText: 'Drain Secure', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
  // { itemNo: 4, customText: 'Drain Cover Secure', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
];
export const initialTableDataForTable_JJ = [
  { itemNo: 1, customText: 'Pictures of each room - ceilings and wall', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 2, customText: 'Any visible water damage?', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  // { itemNo: 3, customText: 'Drain Secure', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
  // { itemNo: 4, customText: 'Drain Cover Secure', status: false, location: '', correctiveAction: '', image: '', actualStatus: false},
];

export const interiorCeilingAndWallsII = [
  { itemNo: 1, customText: 'Any visible water leaks?', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 2, customText: 'Any visible cracks?', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 3, customText: 'Drain Secure', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
];

export const exteriorCeilingAndWallsJJ = [
  { itemNo: 1, customText: 'Any visible water leaks?', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 2, customText: 'Any visible cracks?', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 3, customText: 'Drain Secure', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
];

export const initialTableDataForTable_One_I = [
  { itemNo: 1, customText: 'Reflectivity', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 2, customText: 'Adhesion', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 3, customText: 'Wind / Hail', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 4, customText: 'Discoloration', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 5, customText: 'Cracking / Peeling', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 6, customText: 'Ponding', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 7, customText: 'Fish Lips in Fabric', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 8, customText: 'Ponding', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 9, customText: 'Exposed Nails', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 10, customText: 'Other', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
];

export const initialTableDataForTable_One_K = [
  { itemNo: 1, customText: 'Corrosion (Metal Deck)', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 2, customText: 'Spalling (Chipping or Crumbling)', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 3, customText: 'Buckling', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 4, customText: 'Sagging', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 5, customText: 'Soft Decking', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 6, customText: 'Exposed', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 7, customText: 'Other', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
];

export const gutters = [
  { itemNo: 1, customText: 'Clean of Debris', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
  { itemNo: 2, customText: 'Properly Secured', status: true, location: '', correctiveAction: '', image: '', actualStatus: true },
];

export const initialTableDataForTable_One_L = [
  { itemNo: 1, customText: 'Penetration Flashings)', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 2, customText: 'Pitch Pans', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 3, customText: 'TPO Molded Pipe Flashings', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 4, customText: 'Rubber Boots', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 5, customText: 'Vent Caps', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 6, customText: 'Turbine Vents', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 7, customText: 'Turtle Vents -', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 8, customText: 'Wall Flashing', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 9, customText: 'Counter Flashing', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 10, customText: 'Valley Metal', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 11, customText: 'Edge Metal', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 12, customText: 'Metal / Wood Fascia', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 13, customText: 'Metal / Wood Soffit', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
  { itemNo: 14, customText: 'Other', status: false, location: '', correctiveAction: '', image: '', actualStatus: false },
];

export const accordionMapping = [
  {
    name: 'Shingles',
    tableInfo: initialTableDataForTable_A,
    TableNo: "A"
  },
  {
    name: 'Metal',
    tableInfo: initialTableDataForTable_B,
    TableNo: "B"
  },
  {
    name: 'Tile',
    tableInfo: initialTableDataForTable_C,
    TableNo: "C"
  },
  {
    name: 'Wood Shakes',
    tableInfo: initialTableDataForTable_D,
    TableNo: "D"
  },
  {
    name: 'Stonecoated Steel',
    tableInfo: initialTableDataForTable_E,
    TableNo: "E"
  },
  {
    name: 'Gravel / Rock',
    tableInfo: initialTableDataForTable_F,
    TableNo: "F"
  },
  {
    name: 'Modified Bitumen / Rolled Roofing',
    tableInfo: initialTableDataForTable_G,
    TableNo: "G"
  },
  {
    name: 'Single Ply / Ballast',
    tableInfo: initialTableDataForTable_H,
    TableNo: "H"
  },
  {
    name: 'Coating',
    tableInfo: initialTableDataForTable_One_I,
    TableNo: "I"
  },
  {
    name: 'Parapet Walls',
    tableInfo: initialTableDataForTable_J,
    TableNo: "J"
  },
  {
    name: 'Decking',
    tableInfo: initialTableDataForTable_One_K,
    TableNo: "K"
  },
  {
    name: 'Scuppers / Drains',
    tableInfo: initialTableDataForTable_AA,
    TableNo: "AA"
  },
  {
    name: 'A/C',
    tableInfo: initialTableDataForTable_BB,
    TableNo: "BB"
  },
  {
    name: 'Gutters',
    tableInfo: gutters,
    TableNo: "L"
  },
  {
    name: 'Top of Chimney Sealed',
    tableInfo: initialTableDataForTable_EE,
    TableNo: "EE"
  },
  {
    name: 'Electrical Conduct',
    tableInfo: initialTableDataForTable_FF,
    TableNo: "FF"
  },
  {
    name: 'Gas Line',
    tableInfo: initialTableDataForTable_GG,
    TableNo: "GG"
  },
  {
    name: 'Satellite Dish',
    tableInfo: initialTableDataForTable_HH,
    TableNo: "HH"
  },
  {
    name: 'Roof Clean of Debris',
    tableInfo: initialTableDataForTable_II,
    TableNo: "II"
  },
  {
    name: 'Exterior Walls',
    tableInfo: initialTableDataForTable_JJ,
    TableNo: "JJ"
  }
]

export const gratedMapping = {
  A: "Condition: Excellent,\n The roof appears relatively new and requires only simple debris removal, flashing inspection, and touch-up. It qualifies for a TotalRoof Maintenance Agreement" ,
  B: "Condition: Good,\n Roof is not in an aged condition. All flashings, whether membrane or shingle, parapet wall coverings, penetrations, and equipment/skylight flashings are in good condition, requiring minor repair work and coating of flashings. Debris is not excessive. After recommended repairs are completed, the roof qualifies for the Total Roof Maintenance Agreement.",
  C: "Condition: Fair,\n The roof is showing normal signs of age, including wear and tear, and may have foot traffic wear. Some flashings have leaked but are repairable. The roof membrane is showing signs of aging and excessive debris. After recommended repairs are completed, the roof qualifies for the Total Roof Maintenance Agreement.",
  D: "Condition: Poor,\n Roof is showing many areas of wear and has seam / lap problems. Previous repairs are evident and flashing problems have occurred. Extensive work is needed. Once repaired, this roof may be maintained for a short time. This is typically the last opportunity to consider recovery or restoration. May only qualify for a Total Roof Maintenance Plan if recommended repairs are completed. Budgeting for replacement is encouraged. Moisture Survey is mandatory if warranty is desired. ",
  F: "Condition: Bad,\n Roof is showing excessive wear or problems and leaking may be occurring. Life extension of the roof system is difficult. There are system-wide seam, lap, and flashing failures. Inner-ply asphalt in built up roof systems may be completely lifeless and crumbling. Does not qualify for the Total Roof Maintenance Agreement.",
};
