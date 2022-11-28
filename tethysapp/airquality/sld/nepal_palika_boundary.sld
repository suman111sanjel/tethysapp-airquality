<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>A teal polygon style</Name>
    <UserStyle>
      <Name>A teal polygon style</Name>
      <Title>A teal polygon style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Name></Name>
           <MaxScaleDenominator>545000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#080000</CssParameter>
              <CssParameter name="stroke-width">0.1</CssParameter>
              <CssParameter name="stroke-dasharray"/>
              <CssParameter name="stroke-dashoffset">0</CssParameter>
              <CssParameter name="stroke-opacity">0.5</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <Rule>
          <Name></Name>
          <MaxScaleDenominator>545000</MaxScaleDenominator>
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName>local </ogc:PropertyName>
            </Label>
            <Font>
              <CssParameter name="font-family">Arial Bold</CssParameter>
              <CssParameter name="font-style">Normal</CssParameter>
              <CssParameter name="font-weight">bold</CssParameter>
              <CssParameter name="font-size">11</CssParameter>
            </Font>
            <LabelPlacement>
              <PointPlacement>
                 <AnchorPoint>
                   <AnchorPointX>0.5</AnchorPointX>
                   <AnchorPointY>0.5</AnchorPointY>
                </AnchorPoint>
                <Displacement>
                  <DisplacementX>0</DisplacementX>
                  <DisplacementY>0</DisplacementY>
                </Displacement>
              </PointPlacement>
            </LabelPlacement>
            <Halo>
              <Radius>3</Radius>
              <Fill>
                <CssParameter name="fill">#FFFFFF</CssParameter>
              </Fill>
            </Halo>
          </TextSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
