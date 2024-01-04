let allYears = [];
let initialYear;
for (initialYear = 2000; initialYear <= new Date().getFullYear(); initialYear++) {
    allYears.unshift({
        value: initialYear,
        label: initialYear
    });
}


export const dataSelect = {
    region: [{value: "HKH", label: "HKH"},
        {value: "AFGHANISTAN", label: "AFGHANISTAN"},
        {value: "BANGLADESH", label: "BANGLADESH"},
        {value: "BHUTAN", label: "BHUTAN"},
        {value: "CHINA", label: "CHINA"},
        {value: "INDIA", label: "INDIA"},
        {value: "MYANMAR", label: "MYANMAR"},
        {value: "NEPAL", label: "NEPAL"},
        {value: "PAKISTAN", label: "PAKISTAN"}],
    pollutants: [{value: "BC", label: "BC"},
        {value: "CO", label: "CO",},
        {value: "NOx", label: "NOx",},
        {value: "OC", label: "OC",},
        {value: "PM10", label: "PM10"},
        {value: "PM2p5", label: "PM25",},
        {value: "SO2", label: "SO2"},
    ],
    periodicity: [
        {
            value: "dekad",
            label: "Dekad (10 day)"
        },
        {value: "monthly", label: "Monthly"},
        {
            value: "quartly",
            label: "Quartly"
        }
    ],
    periodicityOutlook: [{value: "monthly", label: "Monthly Anomaly"}],
    year: [{value: '1990', label: "1990"}, {value: '1995', label: "1995"}, {
        value: '2000',
        label: "2000"
    }, {value: '2005', label: "2005"}, {value: '2010', label: "2010"}, {value: '2015', label: "2015"}],
    ensemble: [{value: "mean", label: "Mean"}, {value: "ens0", label: "1"}, {
        value: "ens1",
        label: "2"
    }, {value: "ens2", label: "3"}, {value: "ens3", label: "4"}, {
        value: "ens4",
        label: "5"
    }, {value: "ens5", label: "6"}, {value: "ens6", label: "7"}],
    sectors: [{value: "Total", label: "Total"},
        {value: "Residential", label: "Residential"},
        {value: "Industry", label: "Industry"},
        {value: "Transport", label: "Transport"},
        {value: "Energy", label: "Energy"},],
    Inventory: [{value: "GAINS", label: "GAINS"},
        {value: "REAS", label: "REAS"},
        {value: "EDGAR", label: "EDGAR"}
    ],
    socioEconomicType: [{value: "Demographic", label: "Demographic"},],
    population: [{value: "TotalPopulation", label: "Total Population"},
        {value: "PopulationDensity", label: "Population Density"},
        {value: "Child", label: "Child (0 - 14)"},
        {value: "Adult", label: "Adult (15 - 59)"},
        {value: "Old", label: "Old (60 - 80+)"},],
    pop_year: [{
        value: '2000',
        label: "2000"
    }, {
        value: '2001',
        label: "2001"
    }, {
        value: '2002',
        label: "2002"
    }, {
        value: '2003',
        label: "2003"
    }, {
        value: '2004',
        label: "2004"
    }, {value: '2005', label: "2005"},
        {value: '2006', label: "2006"},
        {value: '2007', label: "2007"},
        {value: '2008', label: "2008"}, {value: '2009', label: "2009"}, {value: '2010', label: "2010"}, {
            value: '2011',
            label: "2011"
        }, {value: '2012', label: "2012"}, {value: '2013', label: "2013"}, {
            value: '2014',
            label: "2014"
        }, {value: '2015', label: "2015"}, {value: '2016', label: "2016"}, {
            value: '2017',
            label: "2017"
        }, {value: '2018', label: "2018"}, {value: '2019', label: "2019"}, {value: '2020', label: "2020"},],
};


export var mbasin = ["Amudarya", "Brahmaputra", "Eastern Asian", "Ganga", "Indus", "Irrawaddy", "Mekong", "Qinghai-Tibetan", "Salween", "Tarim", "Yangtze", "Yellow River"];

export var WMSLAYERS = {
    "Tair_f_tavg": "Air Temperature",
    "Rainf_f_tavg": "Rainfall flux",
    "SoilMoist_inst": "Soil moisture content",
    "Evap_tavg": "Total evapotranspiration"
};
export var WMSSLD = {
    "Tair_f_tavg": '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><se:Name>Tair_f_tavg</se:Name><UserStyle><se:Name>Thesholded colour scheme</se:Name><se:CoverageStyle><se:Rule><se:RasterSymbolizer><se:Opacity>1.0</se:Opacity><se:ColorMap><se:Categorize fallbackValue="#00000000"><se:LookupValue>Rasterdata</se:LookupValue><se:Value>#00000000</se:Value><se:Threshold>-5</se:Threshold><se:Value>#9999FF</se:Value><se:Threshold>-4.5</se:Threshold><se:Value>#99A7FF</se:Value><se:Threshold>-4</se:Threshold><se:Value>#9CB6FF</se:Value><se:Threshold>-3.5</se:Threshold><se:Value>#9CC2FF</se:Value><se:Threshold>-3</se:Threshold><se:Value>#9CD1FF</se:Value><se:Threshold>-2.5</se:Threshold><se:Value>#9CDEFF</se:Value><se:Threshold>-2</se:Threshold><se:Value>#9CEDFF</se:Value><se:Threshold>-1.5</se:Threshold><se:Value>#99FCFF</se:Value><se:Threshold>-1</se:Threshold><se:Value>#A6FFF6</se:Value><se:Threshold>-0.5</se:Threshold><se:Value>#B5FFE6</se:Value><se:Threshold>0</se:Threshold><se:Value>#E1E1E1</se:Value><se:Threshold>0.5</se:Threshold><se:Value>#E1E1E1</se:Value><se:Threshold>1</se:Threshold><se:Value>#FFFFBE</se:Value><se:Threshold>1.5</se:Threshold><se:Value>#FFEBAF</se:Value><se:Threshold>2</se:Threshold><se:Value>#FFD37F</se:Value><se:Threshold>2.5</se:Threshold><se:Value>#E69800</se:Value><se:Threshold>3</se:Threshold><se:Value>#FF7F7F</se:Value><se:Threshold>3.5</se:Threshold><se:Value>#E64C00</se:Value><se:Threshold>4</se:Threshold><se:Value>#A83800</se:Value><se:Threshold>4.5</se:Threshold><se:Value>#732600</se:Value><se:Threshold>5</se:Threshold><se:Value>#00000000</se:Value></se:Categorize></se:ColorMap></se:RasterSymbolizer></se:Rule></se:CoverageStyle></UserStyle></NamedLayer></StyledLayerDescriptor>',
    "Rainf_f_tavg": '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><se:Name>Rainf_f_tavg</se:Name><UserStyle><se:Name>Thesholded colour scheme</se:Name><se:CoverageStyle><se:Rule><se:RasterSymbolizer><se:Opacity>1.0</se:Opacity><se:ColorMap><se:Categorize fallbackValue="#00000000"><se:LookupValue>Rasterdata</se:LookupValue><se:Value>#00000000</se:Value><se:Threshold>-2.5</se:Threshold><se:Value>#C2523C</se:Value><se:Threshold>-2</se:Threshold><se:Value>#FFAA01</se:Value><se:Threshold>-1.5</se:Threshold><se:Value>#FFD380</se:Value><se:Threshold>-1</se:Threshold><se:Value>#FEFF73</se:Value><se:Threshold>-0.5</se:Threshold><se:Value>#E1E1E1</se:Value><se:Threshold>0</se:Threshold><se:Value>#E1E1E1</se:Value><se:Threshold>0.5</se:Threshold><se:Value>#E9FFBE</se:Value><se:Threshold>1</se:Threshold><se:Value>#7BED01</se:Value><se:Threshold>1.5</se:Threshold><se:Value>#21DD00</se:Value><se:Threshold>2</se:Threshold><se:Value>#0ACC2E</se:Value><se:Threshold>2.5</se:Threshold><se:Value>#17B568</se:Value><se:Threshold>3</se:Threshold><se:Value>#1E9B89</se:Value><se:Threshold>3.5</se:Threshold><se:Value>#1A828F</se:Value><se:Threshold>4</se:Threshold><se:Value>#135784</se:Value><se:Threshold>4.5</se:Threshold><se:Value>#00000000</se:Value></se:Categorize></se:ColorMap></se:RasterSymbolizer></se:Rule></se:CoverageStyle></UserStyle></NamedLayer></StyledLayerDescriptor>',
    "SoilMoist_inst": '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><se:Name>SoilMoist_inst</se:Name><UserStyle><se:Name>Thesholded colour scheme</se:Name><se:CoverageStyle><se:Rule><se:RasterSymbolizer><se:Opacity>1.0</se:Opacity><se:ColorMap><se:Categorize fallbackValue="#00000000"><se:LookupValue>Rasterdata</se:LookupValue><se:Value>#00000000</se:Value><se:Threshold>-2.5</se:Threshold><se:Value>#C2523C</se:Value><se:Threshold>-2</se:Threshold><se:Value>#FFAA01</se:Value><se:Threshold>-1.5</se:Threshold><se:Value>#FFD380</se:Value><se:Threshold>-1</se:Threshold><se:Value>#FEFF73</se:Value><se:Threshold>-0.5</se:Threshold><se:Value>#E1E1E1</se:Value><se:Threshold>0</se:Threshold><se:Value>#E1E1E1</se:Value><se:Threshold>0.5</se:Threshold><se:Value>#E9FFBE</se:Value><se:Threshold>1</se:Threshold><se:Value>#7BED01</se:Value><se:Threshold>1.5</se:Threshold><se:Value>#21DD00</se:Value><se:Threshold>2</se:Threshold><se:Value>#0ACC2E</se:Value><se:Threshold>2.5</se:Threshold><se:Value>#17B568</se:Value><se:Threshold>3</se:Threshold><se:Value>#1E9B89</se:Value><se:Threshold>3.5</se:Threshold><se:Value>#1A828F</se:Value><se:Threshold>4</se:Threshold><se:Value>#135784</se:Value><se:Threshold>4.5</se:Threshold><se:Value>#00000000</se:Value></se:Categorize></se:ColorMap></se:RasterSymbolizer></se:Rule></se:CoverageStyle></UserStyle></NamedLayer></StyledLayerDescriptor>',
    "Evap_tavg": '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><NamedLayer><se:Name>Evap_tavg</se:Name><UserStyle><se:Name>Thesholded colour scheme</se:Name><se:CoverageStyle><se:Rule><se:RasterSymbolizer><se:Opacity>1.0</se:Opacity><se:ColorMap><se:Categorize fallbackValue="#00000000"><se:LookupValue>Rasterdata</se:LookupValue><se:Value>#00000000</se:Value><se:Threshold>-2.5</se:Threshold><se:Value>#C2523C</se:Value><se:Threshold>-2</se:Threshold><se:Value>#FFAA01</se:Value><se:Threshold>-1.5</se:Threshold><se:Value>#FFD380</se:Value><se:Threshold>-1</se:Threshold><se:Value>#FEFF73</se:Value><se:Threshold>-0.5</se:Threshold><se:Value>#E1E1E1</se:Value><se:Threshold>0</se:Threshold><se:Value>#E1E1E1</se:Value><se:Threshold>0.5</se:Threshold><se:Value>#E9FFBE</se:Value><se:Threshold>1</se:Threshold><se:Value>#7BED01</se:Value><se:Threshold>1.5</se:Threshold><se:Value>#21DD00</se:Value><se:Threshold>2</se:Threshold><se:Value>#0ACC2E</se:Value><se:Threshold>2.5</se:Threshold><se:Value>#17B568</se:Value><se:Threshold>3</se:Threshold><se:Value>#1E9B89</se:Value><se:Threshold>3.5</se:Threshold><se:Value>#1A828F</se:Value><se:Threshold>4</se:Threshold><se:Value>#135784</se:Value><se:Threshold>4.5</se:Threshold><se:Value>#00000000</se:Value></se:Categorize></se:ColorMap></se:RasterSymbolizer></se:Rule></se:CoverageStyle></UserStyle></NamedLayer></StyledLayerDescriptor>',
};
export var WMSSLDCurrent = {
    "Tair_f_tavg": '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd"                       xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"                       xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink"                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">    <NamedLayer>        <se:Name>Tair_f_tavg</se:Name>        <UserStyle>            <se:Name>Thesholded colour scheme</se:Name>            <se:CoverageStyle>                <se:Rule>                    <se:RasterSymbolizer>                        <se:Opacity>1.0</se:Opacity>                        <se:ColorMap>                            <se:Categorize fallbackValue="#00000000">                                <se:LookupValue>Rasterdata</se:LookupValue>                                <se:Value>#0c2c84</se:Value><se:Threshold>273</se:Threshold><se:Value>#1d91c0</se:Value><se:Threshold>278</se:Threshold><se:Value>#7fcdbb</se:Value><se:Threshold>283</se:Threshold><se:Value>#c7e9b4</se:Value><se:Threshold>288</se:Threshold><se:Value>#ffeda0</se:Value><se:Threshold>293</se:Threshold><se:Value>#fc4e2a</se:Value><se:Threshold>298</se:Threshold><se:Value>#fc4e2a</se:Value><se:Threshold>303</se:Threshold><se:Value>#b10026</se:Value>                            </se:Categorize>                        </se:ColorMap>                    </se:RasterSymbolizer>                </se:Rule>            </se:CoverageStyle>        </UserStyle>    </NamedLayer></StyledLayerDescriptor>',
    "Rainf_f_tavg": '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd"                       xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"                       xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink"                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">    <NamedLayer>        <se:Name>Rainf_f_tavg</se:Name>        <UserStyle>            <se:Name>Thesholded colour scheme</se:Name>            <se:CoverageStyle>                <se:Rule>                    <se:RasterSymbolizer>                        <se:Opacity>1.0</se:Opacity>                        <se:ColorMap>                            <se:Categorize fallbackValue="#00000000">                                <se:LookupValue>Rasterdata</se:LookupValue>                                <se:Value>#b10026</se:Value><se:Threshold>5</se:Threshold><se:Value>#fc4e2a</se:Value><se:Threshold>10</se:Threshold><se:Value>#feb24c</se:Value><se:Threshold>15</se:Threshold><se:Value>#ffeda0</se:Value><se:Threshold>20</se:Threshold><se:Value>#c7e9b4</se:Value><se:Threshold>25</se:Threshold><se:Value>#7fcdbb</se:Value><se:Threshold>30</se:Threshold><se:Value>#1d91c0</se:Value><se:Threshold>35</se:Threshold><se:Value>#0c2c84</se:Value>                            </se:Categorize>                        </se:ColorMap>                    </se:RasterSymbolizer>                </se:Rule>            </se:CoverageStyle>        </UserStyle>    </NamedLayer></StyledLayerDescriptor>',
    "SoilMoist_inst": '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd"                       xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"                       xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink"                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">    <NamedLayer>        <se:Name>SoilMoist_inst</se:Name>        <UserStyle>            <se:Name>Thesholded colour scheme</se:Name>            <se:CoverageStyle>                <se:Rule>                    <se:RasterSymbolizer>                        <se:Opacity>1.0</se:Opacity>                        <se:ColorMap>                            <se:Categorize fallbackValue="#00000000">                                <se:LookupValue>Rasterdata</se:LookupValue>                                <se:Value>#b10026</se:Value><se:Threshold>5</se:Threshold><se:Value>#fc4e2a</se:Value><se:Threshold>10</se:Threshold><se:Value>#feb24c</se:Value><se:Threshold>15</se:Threshold><se:Value>#ffeda0</se:Value><se:Threshold>20</se:Threshold><se:Value>#c7e9b4</se:Value><se:Threshold>25</se:Threshold><se:Value>#7fcdbb</se:Value><se:Threshold>30</se:Threshold><se:Value>#1d91c0</se:Value><se:Threshold>35</se:Threshold><se:Value>#0c2c84</se:Value>                            </se:Categorize>                        </se:ColorMap>                    </se:RasterSymbolizer>                </se:Rule>            </se:CoverageStyle>        </UserStyle>    </NamedLayer></StyledLayerDescriptor>',
    "Evap_tavg": '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd"                       xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"                       xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink"                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">    <NamedLayer>        <se:Name>Evap_tavg</se:Name>        <UserStyle>            <se:Name>Thesholded colour scheme</se:Name>            <se:CoverageStyle>                <se:Rule>                    <se:RasterSymbolizer>                        <se:Opacity>1.0</se:Opacity>                        <se:ColorMap>                            <se:Categorize fallbackValue="#00000000">                                <se:LookupValue>Rasterdata</se:LookupValue>                                <se:Value>#b10026</se:Value><se:Threshold>5</se:Threshold><se:Value>#fc4e2a</se:Value><se:Threshold>10</se:Threshold><se:Value>#feb24c</se:Value><se:Threshold>15</se:Threshold><se:Value>#ffeda0</se:Value><se:Threshold>20</se:Threshold><se:Value>#c7e9b4</se:Value><se:Threshold>25</se:Threshold><se:Value>#7fcdbb</se:Value><se:Threshold>50</se:Threshold><se:Value>#1d91c0</se:Value><se:Threshold>75</se:Threshold><se:Value>#0c2c84</se:Value>                            </se:Categorize>                        </se:ColorMap>                    </se:RasterSymbolizer>                </se:Rule>            </se:CoverageStyle>        </UserStyle>    </NamedLayer></StyledLayerDescriptor>',
};

export var legendImage = {
    "Tair_f_tavg": "FinalNewAirTemperature.jpg",
    "Rainf_f_tavg": "final_rain.jpg",
    "SoilMoist_inst": "soil.jpg",
    "Evap_tavg": "evaporation.jpg"
};

// var colorList = ['#ffffff', '#e6ffff', '#66ccff', '#00ff00', '#bfff00', '#ffff00', '#ffbf00', '#ff0000', '#b30000'];


// let SLDParam = {
//     title: 'Air Temperature',
//     showLegendTitle: false,
//     parameterName: 'Tair_f_tavg',
//     propForSLD: [{
//         classType: 'Below',
//         label: ["less than -5", ""],
//         color: '#00000000',
//         value: -5
//     }, {
//         label: ["-5 to -4.5", ""], color: '#9999FF',
//         range: [-5, -4.5]
//     }, {
//         label: ["-4.5 to -4", ""], color: '#99A7FF',
//         range: [-4.5, -4]
//     }, {
//         label: ["-4 to -3.5", ""], color: '#9CB6FF',
//         range: [-4, -3.5]
//     }, {
//         label: ["1.5 to 2", ""], color: '#FFEBAF',
//         range: [1.5, 2]
//     }, {
//         label: ["3 to 3.5", ""], color: '#FF7F7F',
//         range: [3, 3.5]
//     }, {
//         label: ["3.5 to 4", ""], color: '#E64C00',
//         range: [3.5, 4]
//     }, {
//         label: ["4 to 4.5", ""], color: '#A83800',
//         range: [4, 4.5]
//     }, {
//         classType: 'Above',
//         label: ["5 or more", ""], color: '#00000000',
//         value: 5
//     }],
// };


// let layerPropertiesList = [{
//     id: '',
//     title: 'Air Temperature',
//     showLegendTitle: false,
//     parameterName: 'Tair_f_tavg',
//     propForSLD: [{
//         classType: 'Below',
//         label: ["less than -5", ""],
//         color: '#00000000',
//         value: -5
//     }, {
//         label: ["-5 to -4.5", ""], color: '#9999FF',
//         range: [-5, -4.5]
//     }, {
//         label: ["-4.5 to -4", ""], color: '#99A7FF',
//         range: [-4.5, -4]
//     }, {
//         label: ["-4 to -3.5", ""], color: '#9CB6FF',
//         range: [-4, -3.5]
//     }, {
//         label: ["1.5 to 2", ""], color: '#FFEBAF',
//         range: [1.5, 2]
//     }, {
//         label: ["3 to 3.5", ""], color: '#FF7F7F',
//         range: [3, 3.5]
//     }, {
//         label: ["3.5 to 4", ""], color: '#E64C00',
//         range: [3.5, 4]
//     }, {
//         label: ["4 to 4.5", ""], color: '#A83800',
//         range: [4, 4.5]
//     }, {
//         classType: 'Above',
//         label: ["5 or more", ""], color: '#00000000',
//         value: 5
//     }],
// }];


let layerList = [
    ['REAS___BC___Total', 'REAS', 'BC', 'Total', 5.90635967254638, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___BC___Residential', 'REAS', 'BC', 'Residential', 3.36123776435852, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___BC___Transport', 'REAS', 'BC', 'Transport', 4.53458881378173, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___BC___Industry', 'REAS', 'BC', 'Industry', 4.90902614593505, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___BC___Energy', 'REAS', 'BC', 'Energy', 0.42021644115448, ['0.00000001', '0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1], [['less than 1e-08', ''], ['1e-08 to 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___CO___Total', 'REAS', 'CO', 'Total', 2492.0791015625, [0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0, 1000.0], [['less than 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 to 1e+03', ''], ['1e+03 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___CO___Residential', 'REAS', 'CO', 'Residential', 305.503173828125, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___CO___Transport', 'REAS', 'CO', 'Transport', 340.202941894531, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___CO___Industry', 'REAS', 'CO', 'Industry', 2484.740234375, [0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0, 1000.0], [['less than 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 to 1e+03', ''], ['1e+03 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___CO___Energy', 'REAS', 'CO', 'Energy', 12.5061283111572, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___NOx___Total', 'REAS', 'NOx', 'Total', 140.212326049804, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___NOx___Residential', 'REAS', 'NOx', 'Residential', 22.4503192901611, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___NOx___Transport', 'REAS', 'NOx', 'Transport', 44.1139068603515, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___NOx___Industry', 'REAS', 'NOx', 'Industry', 114.093849182128, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___NOx___Energy', 'REAS', 'NOx', 'Energy', 52.9525299072265, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___OC___Total', 'REAS', 'OC', 'Total', 17.145128250122, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___OC___Residential', 'REAS', 'OC', 'Residential', 12.6038732528686, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___OC___Transport', 'REAS', 'OC', 'Transport', 1.6988251209259, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___OC___Industry', 'REAS', 'OC', 'Industry', 8.57281112670898, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___OC___Energy', 'REAS', 'OC', 'Energy', 0.172008112072944, ['0.00000001', '0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1], [['less than 1e-08', ''], ['1e-08 to 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___PM10___Total', 'REAS', 'PM10', 'Total', 182.490966796875, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___PM10___Residential', 'REAS', 'PM10', 'Residential', 19.7488594055175, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___PM10___Transport', 'REAS', 'PM10', 'Transport', 7.37015295028686, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___PM10___Industry', 'REAS', 'PM10', 'Industry', 157.537033081054, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___PM10___Energy', 'REAS', 'PM10', 'Energy', 13.6437997817993, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___PM2p5___Total', 'REAS', 'PM2p5', 'Total', 106.149459838867, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___PM2p5___Residential', 'REAS', 'PM2p5', 'Residential', 18.8245296478271, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___PM2p5___Transport', 'REAS', 'PM2p5', 'Transport', 7.26222372055053, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___PM2p5___Industry', 'REAS', 'PM2p5', 'Industry', 92.1728286743164, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___PM2p5___Energy', 'REAS', 'PM2p5', 'Energy', 8.57247734069824, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___SO2___Total', 'REAS', 'SO2', 'Total', 644.566772460937, [0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0, 1000.0], [['less than 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 to 1e+03', ''], ['1e+03 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___SO2___Residential', 'REAS', 'SO2', 'Residential', 53.7299194335937, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___SO2___Transport', 'REAS', 'SO2', 'Transport', 9.21748828887939, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___SO2___Industry', 'REAS', 'SO2', 'Industry', 198.901260375976, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['REAS___SO2___Energy', 'REAS', 'SO2', 'Energy', 134.010818481445, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___BC___Total', 'GAINS', 'BC', 'Total', 16.3189430236816, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___BC___Residential', 'GAINS', 'BC', 'Residential', 9.50524234771728, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___BC___Transport', 'GAINS', 'BC', 'Transport', 5.65739822387695, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___BC___Industry', 'GAINS', 'BC', 'Industry', 2.57163405418395, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___BC___Energy', 'GAINS', 'BC', 'Energy', 1.42664492130279, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___CO___Total', 'GAINS', 'CO', 'Total', 856.674133300781, [0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0, 1000.0], [['less than 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 to 1e+03', ''], ['1e+03 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___CO___Residential', 'GAINS', 'CO', 'Residential', 344.522766113281, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___CO___Transport', 'GAINS', 'CO', 'Transport', 362.705108642578, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___CO___Industry', 'GAINS', 'CO', 'Industry', 650.939453125, [0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0, 1000.0], [['less than 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 to 1e+03', ''], ['1e+03 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___CO___Energy', 'GAINS', 'CO', 'Energy', 80.8608322143554, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___NOx___Total', 'GAINS', 'NOx', 'Total', 255.737258911132, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___NOx___Residential', 'GAINS', 'NOx', 'Residential', 9.66963100433349, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___NOx___Transport', 'GAINS', 'NOx', 'Transport', 130.639373779296, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___NOx___Industry', 'GAINS', 'NOx', 'Industry', 97.3676528930664, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___NOx___Energy', 'GAINS', 'NOx', 'Energy', 120.853538513183, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___OC___Total', 'GAINS', 'OC', 'Total', 25.4911918640136, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___OC___Residential', 'GAINS', 'OC', 'Residential', 14.6601982116699, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___OC___Transport', 'GAINS', 'OC', 'Transport', 12.4218959808349, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___OC___Industry', 'GAINS', 'OC', 'Industry', 1.0705087184906, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___OC___Energy', 'GAINS', 'OC', 'Energy', 2.24600028991699, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___PM10___Total', 'GAINS', 'PM10', 'Total', 197.56867980957, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___PM10___Residential', 'GAINS', 'PM10', 'Residential', 77.9535980224609, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___PM10___Transport', 'GAINS', 'PM10', 'Transport', 23.6912956237792, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___PM10___Industry', 'GAINS', 'PM10', 'Industry', 71.7012100219726, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___PM10___Energy', 'GAINS', 'PM10', 'Energy', 75.0917663574218, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___PM2p5___Total', 'GAINS', 'PM2p5', 'Total', 126.906242370605, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___PM2p5___Residential', 'GAINS', 'PM2p5', 'Residential', 56.9104270935058, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___PM2p5___Transport', 'GAINS', 'PM2p5', 'Transport', 22.4125061035156, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___PM2p5___Industry', 'GAINS', 'PM2p5', 'Industry', 49.1257705688476, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___PM2p5___Energy', 'GAINS', 'PM2p5', 'Energy', 22.2145442962646, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___SO2___Total', 'GAINS', 'SO2', 'Total', 326.366882324218, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___SO2___Residential', 'GAINS', 'SO2', 'Residential', 39.0412864685058, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___SO2___Transport', 'GAINS', 'SO2', 'Transport', 13.1418828964233, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___SO2___Industry', 'GAINS', 'SO2', 'Industry', 241.244338989257, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['GAINS___SO2___Energy', 'GAINS', 'SO2', 'Energy', 286.270538330078, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___BC___Total', 'EDGAR', 'BC', 'Total', 26.9559309951782, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___BC___Residential', 'EDGAR', 'BC', 'Residential', 0.354042315262556, ['0.00000001', '0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1], [['less than 1e-08', ''], ['1e-08 to 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___BC___Transport', 'EDGAR', 'BC', 'Transport', 1.14314790644645, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___BC___Industry', 'EDGAR', 'BC', 'Industry', 26.9498316467285, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___BC___Energy', 'EDGAR', 'BC', 'Energy', 2.66838060007095, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___CO___Total', 'EDGAR', 'CO', 'Total', 2438.45105273437, [0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0, 1000.0], [['less than 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 to 1e+03', ''], ['1e+03 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___CO___Residential', 'EDGAR', 'CO', 'Residential', 38.9738866333007, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___CO___Transport', 'EDGAR', 'CO', 'Transport', 394.993021508789, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___CO___Industry', 'EDGAR', 'CO', 'Industry', 2437.77045893554, [0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0, 1000.0], [['less than 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 to 1e+03', ''], ['1e+03 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___CO___Energy', 'EDGAR', 'CO', 'Energy', 135.711784698486, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___NOx___Total', 'EDGAR', 'NOx', 'Total', 508.899899377441, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___NOx___Residential', 'EDGAR', 'NOx', 'Residential', 7.26847960882186, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___NOx___Transport', 'EDGAR', 'NOx', 'Transport', 37.0271012695312, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___NOx___Industry', 'EDGAR', 'NOx', 'Industry', 508.875351196289, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___NOx___Energy', 'EDGAR', 'NOx', 'Energy', 182.588888891601, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___OC___Total', 'EDGAR', 'OC', 'Total', 64.4831109832763, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___OC___Residential', 'EDGAR', 'OC', 'Residential', 1.91931391060352, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___OC___Transport', 'EDGAR', 'OC', 'Transport', 0.702768021583557, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___OC___Industry', 'EDGAR', 'OC', 'Industry', 64.4528027252197, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___OC___Energy', 'EDGAR', 'OC', 'Energy', 2.28398028459548, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___PM10___Total', 'EDGAR', 'PM10', 'Total', 347.986421136474, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___PM10___Residential', 'EDGAR', 'PM10', 'Residential', 5.42583458833694, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___PM10___Transport', 'EDGAR', 'PM10', 'Transport', 2.34391590156555, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___PM10___Industry', 'EDGAR', 'PM10', 'Industry', 347.892540930175, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___PM10___Energy', 'EDGAR', 'PM10', 'Energy', 88.236288432312, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___PM2p5___Total', 'EDGAR', 'PM2p5', 'Total', 305.428198480224, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___PM2p5___Residential', 'EDGAR', 'PM2p5', 'Residential', 3.77355011987686, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___PM2p5___Transport', 'EDGAR', 'PM2p5', 'Transport', 2.19737603931427, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___PM2p5___Industry', 'EDGAR', 'PM2p5', 'Industry', 305.366345507812, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___PM2p5___Energy', 'EDGAR', 'PM2p5', 'Energy', 61.9245888656616, ['0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0], [['less than 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___SO2___Total', 'EDGAR', 'SO2', 'Total', 1067.37240783691, [0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0, 1000.0], [['less than 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 to 1e+03', ''], ['1e+03 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___SO2___Residential', 'EDGAR', 'SO2', 'Residential', 15.9809639419555, ['0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0, 10.0], [['less than 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___SO2___Transport', 'EDGAR', 'SO2', 'Transport', 2.31042273187637, ['0.0000001', '0.000001', '0.00001', 0.0001, 0.001, 0.01, 0.1, 1.0], [['less than 1e-07', ''], ['1e-07 to 1e-06', ''], ['1e-06 to 1e-05', ''], ['1e-05 to 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___SO2___Industry', 'EDGAR', 'SO2', 'Industry', 1067.32620659179, [0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0, 1000.0], [['less than 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 to 1e+03', ''], ['1e+03 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']],
    ['EDGAR___SO2___Energy', 'EDGAR', 'SO2', 'Energy', 780.430286535644, [0.0001, 0.001, 0.01, 0.1, 1.0, 10.0, 100.0, 1000.0], [['less than 1e-04', ''], ['1e-04 to 1e-03', ''], ['1e-03 to 1e-02', ''], ['1e-02 to 1e-01', ''], ['1e-01 to 1e+00', ''], ['1e+00 to 1e+01', ''], ['1e+01 to 1e+02', ''], ['1e+02 to 1e+03', ''], ['1e+03 or more', '']], ['#00008F', '#006BFF', '#00DBFF', '#47FFB7', '#B7FF47', '#FFD700', '#FF6700', '#F60000', '#8C0000']]
];

export function getLayerPropObj(Invertory, pollutant, sectors) {
    let selArray = layerList.filter(function (ar) {
        return ar[0] == Invertory + '___' + pollutant + '___' + sectors;
    });
    if (selArray.length) {
        selArray.forEach(function (arr) {
            if (arr.length <= 8) {
                let propForSLD = []
                let rangeLength = arr[5].length - 1;
                arr[5].forEach(function (RangeVal, index) {
                    if (index === 0) {
                        propForSLD.push({
                            classType: 'Below',
                            label: arr[6][0],
                            color: arr[7][0],
                            value: RangeVal
                        });
                        propForSLD.push({
                            label: arr[6][1], color: arr[7][1],
                            range: [RangeVal, arr[5][1]]
                        });
                    } else if (index == rangeLength) {
                        propForSLD.push({
                            classType: 'Above',
                            label: arr[6][index + 1], color: arr[7][index + 1],
                            value: RangeVal
                        });
                    } else {
                        propForSLD.push({
                            label: arr[6][index + 1], color: arr[7][index + 1],
                            range: [RangeVal, arr[5][index + 1]]
                        });
                    }
                });
                arr.push(propForSLD)
            }
        });

        // let title = [selArray[0][1], selArray[0][2], selArray[0][3]].join(' ').toString()+'<br> suman';

        let retObj = {
            id: selArray[0][0],
            title: [selArray[0][1], selArray[0][2], selArray[0][3]],
            showLegendTitle: true,
            parameterName: selArray[0][3],
            propForSLD: selArray[0][8],
        };
        return retObj;
    } else {
        return false;
    }
};


export const AllInventory = ['GAINS'];









