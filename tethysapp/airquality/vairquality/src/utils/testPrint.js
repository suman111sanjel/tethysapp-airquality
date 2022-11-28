// The map
var map = new ol.Map({
  target: 'map',
  view: new ol.View ({
    zoom: 5,
    center: [266812, 5960201]
  }),
  controls: ol.control.defaults({ "attribution": false }),
  layers: [
    new ol.layer.Tile({ title:'Waterolor', visible: false, source: new ol.source.Stamen({ layer: 'watercolor' }) }),
    new ol.layer.Tile({ title:'Labels', visible: false, source: new ol.source.Stamen({ layer: 'toner-labels' }) }),
    new ol.layer.Geoportail({ layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2' })
  ]
});
map.addControl(new ol.control.LayerSwitcher());
map.addControl(new ol.control.CanvasAttribution({ canvas: true }));
// Add a title control
map.addControl(new ol.control.CanvasTitle({
  title: 'my title',
  visible: false,
  style: new ol.style.Style({ text: new ol.style.Text({ font: '20px "Lucida Grande",Verdana,Geneva,Lucida,Arial,Helvetica,sans-serif'}) })
}));

// Legend
var legend = new ol.legend.Legend({
  title: 'Legend',
  margin: 5,
  items: [{
    title: 'Church',
    typeGeom: 'Point',
    style: new ol.style.Style({
      image: new ol.style.Icon({
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Eglise_icone_2.svg/30px-Eglise_icone_2.svg.png',
      crossOrigin: 'anonymous' // Enable print
    })})
  }, {
    title: 'Photo',
    typeGeom: 'Point',
    style: new ol.style.Style({
      image: new ol.style.Icon({
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Icone_appareil_photo.svg/30px-Icone_appareil_photo.svg.png',
      crossOrigin: 'anonymous' // Enable print
    })})
  }, {
    title: 'Line', typeGeom: 'LineString', style: ol.style.Style.defaultStyle()
  }, {
    title: 'Polygon', typeGeom: 'Polygon', style: ol.style.Style.defaultStyle()
  }]

});

// Add a legend to the print
var legendCtrl = new ol.control.Legend({ legend: legend });
map.addControl(legendCtrl);

// Add a ScaleLine control
map.addControl(new ol.control.CanvasScaleLine());

// Print control
var printControl = new ol.control.PrintDialog();
printControl.setSize('A4');
map.addControl(printControl);

/* On print > save image file */
printControl.on(['print', 'error'], function(e) {
  // Print success
  if (e.image) {
    if (e.pdf) {
      // Export pdf using the print info
      var pdf = new jsPDF({
        orientation: e.print.orientation,
        unit: e.print.unit,
        format: e.print.size
      });
      pdf.addImage(e.image, 'JPEG', e.print.position[0], e.print.position[0], e.print.imageWidth, e.print.imageHeight);
      pdf.save(e.print.legend ? 'legend.pdf' : 'map.pdf');
    } else  {
      // Save image as file
      e.canvas.toBlob(function(blob) {
        var name = (e.print.legend ? 'legend.' : 'map.')+e.imageType.replace('image/','');
        saveAs(blob, name);
      }, e.imageType, e.quality);
    }
  } else {
    console.warn('No canvas to export');
  }
});
