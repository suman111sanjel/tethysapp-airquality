import {DEVICE_PIXEL_RATIO as ol_has_DEVICE_PIXEL_RATIO} from "ol/has";
import {asString as ol_color_asString} from "ol/color";
import {toContext as ol_render_toContext} from "ol/render";
import ol_Feature from "ol/Feature";
import ol_geom_Point from "ol/geom/Point";
import ol_geom_LineString from "ol/geom/LineString";
import ol_geom_Polygon from "ol/geom/Polygon";
import {extend as ol_extent_extend} from "ol/extent";
import ol_legend_Legend from "ol-ext/legend/Legend";

/** Refresh the legend
 */
ol_legend_Legend.prototype.refresh = function () {
    var table = this._listElement;
    table.innerHTML = '';
    var margin = this.get('margin');
    var width = this.get('size')[0] + 2 * margin;
    var height = this.get('lineHeight') || this.get('size')[1] + 2 * margin;

    var canvas = this.getCanvas();
    var ctx = canvas.getContext('2d');
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    var ratio = ol_has_DEVICE_PIXEL_RATIO;

    // Calculate width
    ctx.font = this._titleStyle.getFont();
    var textWidth = this._measureText(ctx, this.getTitle('title')).width;
    // get longest width from this loop
    this._items.forEach(function (r) {
        if (r.get('feature') || r.get('typeGeom')) {
            ctx.font = r.get('textStyle') ? r.get('textStyle').getFont() : this._textStyle.getFont();
            textWidth = Math.max(textWidth, this._measureText(ctx, r.get('title')).width + width);
        } else {
            ctx.font = r.get('textStyle') ? r.get('textStyle').getFont() : this._titleStyle.getFont();
            textWidth = Math.max(textWidth, this._measureText(ctx, r.get('title')).width);
        }
    }.bind(this));

    let heightAccumulator = height;
    //custom calculation of height
    this._items.forEach(function (r) {
        heightAccumulator = heightAccumulator + 6 + r.getProperties().size[1];
    });

    canvas.width = (textWidth + 2 * margin) * ratio;
    canvas.height = heightAccumulator;
    canvas.style.height = heightAccumulator;

    //getLength gives the number of array on _items
    // canvas.height = (this._items.getLength() + 1) * height * ratio;
    // canvas.style.height = ((this._items.getLength() + 1) * height) + 'px';

    ctx.textBaseline = 'middle';
    ctx.fillStyle = ol_color_asString(this._textStyle.getFill().getColor());

    // Add Title
    if (this.getTitle()) {
        table.appendChild(this._title.getElement([width, height], function (b) {
            this.dispatchEvent({
                type: 'select',
                index: -1,
                symbol: b,
                item: this._title
            });
        }.bind(this)));
        ctx.font = this._titleStyle.getFont();
        ctx.textAlign = 'center';
        this._drawText(ctx, this.getTitle(), canvas.width / ratio / 2, height / 2);
    }
    let HTextAndImage = height + height * 0.5;
    // Add items
    this._items.forEach(function (r, i) {
        var index = i + (this.getTitle() ? 1 : 0);
        table.appendChild(r.getElement([width, height], function (b) {
            this.dispatchEvent({
                type: 'select',
                index: i,
                symbol: b,
                item: r
            });
        }.bind(this)));
        var item = r.getProperties();
        ctx.textAlign = 'left';
        if (item.feature || item.typeGeom) {
            canvas = this.getLegendImage(item, canvas, index, HTextAndImage);
            ctx.font = r.get('textStyle') ? r.get('textStyle').getFont() : this._textStyle.getFont();
            this._drawText(ctx, r.get('title'), width + margin, HTextAndImage);

            // this._drawText(ctx, r.get('title'), width + margin, (i + 1.5) * height);
            HTextAndImage = HTextAndImage + 6 + r.getProperties().size[1];
        } else {
            ctx.font = r.get('textStyle') ? r.get('textStyle').getFont() : this._titleStyle.getFont();
            if (/\bcenter\b/.test(item.className)) {
                ctx.textAlign = 'center';
                this._drawText(ctx, r.get('title'), canvas.width / ratio / 2, (i + 1.5) * height);
            } else {
                this._drawText(ctx, r.get('title'), margin, (i + 1.5) * height);
            }
        }
    }.bind(this));

    console.log("loop complete")

    // Done
    this.dispatchEvent({
        type: 'refresh',
        width: width,
        height: (this._items.length + 1) * height
    });
};

/** Get the image for a style
 * @param {olLegendItemOptions} item
 * @param {Canvas|undefined} canvas a canvas to draw in, if none creat one
 * @param {int|undefined} row row number to draw in canvas, default 0
 * @return {CanvasElement}
 */
ol_legend_Legend.prototype.getLegendImage = function (options, canvas, row, accumulatedHeight) {
    options = options || {};
    return ol_legend_Legend.getLegendImage({
        className: options.className,
        feature: options.feature,
        typeGeom: options.typeGeom,
        style: options.style || this._style,
        properties: options.properties,
        margin: options.margin || this.get('margin'),
        size: options.size || this.get('size'),
        accumulatedHeight: accumulatedHeight,
        lineHeight: options.lineHeight || this.get('lineHeight'),
        onload: function () {
            // Force refresh
            this.refresh();
        }.bind(this)
    }, canvas, row);
};

/** Get a symbol image for a given legend item
 * @param {olLegendItemOptions} item
 * @param {Canvas|undefined} canvas a canvas to draw in, if none creat one
 * @param {int|undefined} row row number to draw in canvas, default 0
 */
ol_legend_Legend.getLegendImage = function (item, canvas, row) {
    item = item || {};
    if (typeof (item.margin) === 'undefined') item.margin = 10;
    var size = item.size || [40, 25];
    item.onload = item.onload || function () {
        setTimeout(function () {
            ol_legend_Legend.getLegendImage(item, canvas, row);
        }, 100);
    };
    var width = size[0] + 2 * item.margin;
    var height = item.lineHeight || (size[1] + 2 * item.margin);
    var ratio = item.pixelratio || ol_has_DEVICE_PIXEL_RATIO;
    if (!canvas) {
        row = 0;
        canvas = document.createElement('canvas');
        canvas.width = width * ratio;
        canvas.height = height * ratio;
    }

    var ctx = canvas.getContext('2d');
    ctx.save();
    var vectorContext = ol_render_toContext(ctx, {pixelRatio: ratio});

    var typeGeom = item.typeGeom;
    var style;
    var feature = item.feature;
    if (!feature && typeGeom) {
        if (/Point/.test(typeGeom)) feature = new ol_Feature(new ol_geom_Point([0, 0]));
        else if (/LineString/.test(typeGeom)) feature = new ol_Feature(new ol_geom_LineString([0, 0]));
        else feature = new ol_Feature(new ol_geom_Polygon([[0, 0]]));
        if (item.properties) feature.setProperties(item.properties);
    }
    if (feature) {
        style = feature.getStyle();
        if (typeof (style) === 'function') style = style(feature);
        if (!style) {
            style = typeof (item.style) === 'function' ? item.style(feature) : item.style || [];
        }
        typeGeom = feature.getGeometry().getType();
    } else {
        style = [];
    }
    if (!(style instanceof Array)) style = [style];

    var cx = width / 2;
    var cy = height / 2;
    var sx = size[0] / 2;
    var sy = size[1] / 2;
    var dySave = 10;

    var i, s;
    // Get point offset
    if (typeGeom === 'Point') {
        var extent = null;
        for (i = 0; style[i]; i++) {
            s = style[i]
            var img = s.getImage();
            // Refresh legend on image load
            if (img) {
                var imgElt = img.getPhoto ? img.getPhoto() : img.getImage();
                // Check image is loaded
                if (imgElt && imgElt instanceof HTMLImageElement && !imgElt.naturalWidth) {
                    if (typeof (item.onload) === 'function') {
                        imgElt.addEventListener('load', function () {
                            setTimeout(function () {
                                item.onload()
                            }, 100);
                        });
                    }
                    img.load();
                }
                // Check anchor to center the image
                if (img.getAnchor) {
                    var anchor = img.getAnchor();
                    if (anchor) {
                        var si = img.getSize();
                        var dx = anchor[0] - si[0];
                        var dy = anchor[1] - si[1];
                        dySave = anchor[1];
                        if (!extent) {
                            extent = [dx, dy, dx + si[0], dy + si[1]];
                        } else {
                            ol_extent_extend(extent, [dx, dy, dx + si[0], dy + si[1]]);
                        }
                    }
                }
            }
        }
        if (extent) {
            cx = cx + (extent[2] + extent[0]) / 2;
            cy = cy + (extent[3] + extent[1]) / 2;
        }
    }

    // Draw image
    cy += (row * height) || 0;
    cy = item.accumulatedHeight + dySave - 10;
    for (i = 0; style[i]; i++) {
        s = style[i]
        vectorContext.setStyle(s);
        ctx.save();
        var geom;
        switch (typeGeom) {
            case ol_geom_Point:
            case 'Point':
            case 'MultiPoint': {
                geom = new ol_geom_Point([cx, cy]);
                break;
            }
            case ol_geom_LineString:
            case 'LineString':
            case 'MultiLineString': {
                // Clip lines
                ctx.rect(item.margin * ratio, 0, size[0] * ratio, canvas.height);
                ctx.clip();
                geom = new ol_geom_LineString([[cx - sx, cy], [cx + sx, cy]]);
                break;
            }
            case ol_geom_Polygon:
            case 'Polygon':
            case 'MultiPolygon': {
                geom = new ol_geom_Polygon([[[cx - sx, cy - sy], [cx + sx, cy - sy], [cx + sx, cy + sy], [cx - sx, cy + sy], [cx - sx, cy - sy]]]);
                break;
            }
        }
        // Geometry function?
        if (s.getGeometryFunction()) {
            geom = s.getGeometryFunction()(new ol_Feature(geom));
            ctx.restore();
            vectorContext.drawGeometry(geom);
        } else {
            vectorContext.drawGeometry(geom);
            ctx.restore();
        }
    }

    ctx.restore();

    return canvas;
};


export default ol_legend_Legend