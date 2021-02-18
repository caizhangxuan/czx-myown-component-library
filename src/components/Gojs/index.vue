<script>
/**
 *     <ScriptAdd v-show="!addVisible"  @goBack="backToM" :parentRow="parentData" :flow-data="flowData" ref="flow"/>
 *
 *
 */


import go from 'gojs'

export default {
  name: 'index',
  props: {
    goData: {
      type: Object,
      default: () => {
        return {
          nodeDataArray: [],
          linkDataArray: []
        }
      }
    }
  },
  data() {
    return {
      myGo: null,
      myDiagram: null
    }
  },
  methods: {
    initChart() {
      let $ = go.GraphObject.make
      this.myDiagram = $(go.Diagram, 'myDiagramDiv', {
        'undoManager.isEnabled': true,
        'LinkDrawn': this.showLinkLabel,
        'LinkRelinked': this.showLinkLabel
      })

      this.myDiagram.nodeTemplateMap.add('nodeText', $(go.Node, 'Table', this.nodeStyle(),
        $(go.Panel, 'Auto', $(go.Shape, 'Rectangle', {
            fill: '#282c34',
            stroke: '#00A9C9',
            strokeWidth: 3.5
          }, new go.Binding('figure', 'figure')),
          $(go.TextBlock, this.textStyle(), {
            margin: 8,
            maxSize: new go.Size(160, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: false
          }, new go.Binding('text').makeTwoWay()),
          { cursor: 'pointer', doubleClick: this.test }
        ), this.makePort('T', go.Spot.Top, go.Spot.TopSide, false, true),
        this.makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
        this.makePort('R', go.Spot.Right, go.Spot.RightSide, true, true),
        this.makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, false)))

      // this.myDiagram.nodeTemplateMap.add('Conditional', $(go.Node, 'Table', this.nodeStyle(),
      //   $(go.Panel, 'Auto', $(go.Shape, 'Diamond', {
      //       fill: '#282c34',
      //       stroke: '#00A9C9',
      //       strokeWidth: 3.5
      //     }, new go.Binding('figure', 'figure')),
      //     $(go.TextBlock, this.textStyle(), {
      //       margin: 8,
      //       maxSize: new go.Size(160, NaN),
      //       wrap: go.TextBlock.WrapFit,
      //       editable: false
      //     }, new go.Binding('text').makeTwoWay())
      //   ), this.makePort('T', go.Spot.Top, go.Spot.Top, false, true),
      //   this.makePort('L', go.Spot.Left, go.Spot.Left, true, true),
      //   this.makePort('R', go.Spot.Right, go.Spot.Right, true, true),
      //   this.makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false)))

      this.myDiagram.nodeTemplateMap.add('Start', $(go.Node, 'Table', this.nodeStyle(),
        $(go.Panel, 'Spot', $(go.Shape, 'Circle', {
            desiredSize: new go.Size(70, 70),
            fill: '#282c34',
            stroke: '#09d3ac',
            strokeWidth: 3.5
          }),
          $(go.TextBlock, 'Start', this.textStyle(), new go.Binding('text'))
        ),
        this.makePort('L', go.Spot.Left, go.Spot.Left, true, false),
        this.makePort('R', go.Spot.Right, go.Spot.Right, true, false),
        this.makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false)))

      this.myDiagram.nodeTemplateMap.add('End', $(go.Node, 'Table', this.nodeStyle(),
        $(go.Panel, 'Spot', $(go.Shape, 'Circle', {
            desiredSize: new go.Size(60, 60),
            fill: '#282c34',
            stroke: '#DC3C00',
            strokeWidth: 3.5
          }),
          $(go.TextBlock, 'End', this.textStyle(), new go.Binding('text'))
        ),
        this.makePort('T', go.Spot.Top, go.Spot.Top, false, true),
        this.makePort('L', go.Spot.Left, go.Spot.Left, false, true),
        this.makePort('R', go.Spot.Right, go.Spot.Right, false, true)))

      go.Shape.defineFigureGenerator('File', (shape, w, h) => {
        let geo = new go.Geometry()
        let fig = new go.PathFigure(0, 0, true) // starting point
        geo.add(fig)
        fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, 0))
        fig.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h))
        fig.add(new go.PathSegment(go.PathSegment.Line, w, h))
        fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close())
        let fig2 = new go.PathFigure(.75 * w, 0, false)
        geo.add(fig2)
        fig2.add(new go.PathSegment(go.PathSegment.Line, .75 * w, .25 * h))
        fig2.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h))
        geo.spot1 = new go.Spot(0, .25)
        geo.spot2 = go.Spot.BottomRight
        return geo
      })

      // this.myDiagram.nodeTemplateMap.add("Comment",$(go.Node,"Auto",this.nodeStyle(),$(go.Shape,"File",
      //   { fill: "#282c34", stroke: "#DEE0A3", strokeWidth: 3 }),$(go.TextBlock,this.textStyle(),{
      //   margin: 8, maxSize: new go.Size(200, NaN), wrap: go.TextBlock.WrapFit, textAlign: "center", editable: true }, new go.Binding("text").makeTwoWay()
      // )))

      this.myDiagram.linkTemplate = $(go.Link, {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5, toShortLength: 4,
          relinkableFrom: true,
          relinkableTo: true,
          reshapable: true,
          resegmentable: true,
          // mouse-overs subtly highlight links:
          mouseEnter: function(e, link) {
            link.findObject('HIGHLIGHT').stroke = 'rgba(30,144,255,0.2)'
          },
          mouseLeave: function(e, link) {
            link.findObject('HIGHLIGHT').stroke = 'transparent'
          },
          selectionAdorned: false
        }, new go.Binding('points').makeTwoWay(), $(go.Shape,
        { isPanelMain: true, strokeWidth: 8, stroke: 'transparent', name: 'HIGHLIGHT' }), $(go.Shape,
        { isPanelMain: true, stroke: 'gray', strokeWidth: 2 },
        new go.Binding('stroke', 'isSelected', function(sel) {
          return sel ? 'dodgerblue' : 'gray'
        }).ofObject()),
        $(go.Shape, { toArrow: 'standard', strokeWidth: 0, fill: 'gray' }), $(go.Panel, 'Auto',
          { visible: false, name: 'LABEL', segmentIndex: 2, segmentFraction: 0.5 },
          new go.Binding('visible', 'visible').makeTwoWay(),
          $(go.Shape, 'RoundedRectangle', { fill: '#F8F8F8', strokeWidth: 0 }), $(go.TextBlock, 'Yes',
            { textAlign: 'center', font: '10pt helvetica, arial, sans-serif', stroke: '#333333', editable: false },
            new go.Binding('text').makeTwoWay())
        )
      )

      this.myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal
      this.myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal

      this.load()

      $(go.Palette, 'myPaletteDiv', {
        'animationManager.initialAnimationStyle': go.AnimationManager.None,
        'InitialAnimationStarting': this.animateFadeDown,
        nodeTemplateMap: this.myDiagram.nodeTemplateMap,
        model: new go.GraphLinksModel([
          { category: 'Start', text: 'Start' },
          { text: 'Step',category: 'nodeText' },
          // { category: 'Conditional', text: '???' },
          { category: 'End', text: 'End' },
          // { category: "Comment", text: "Comment" }
        ])
      })
    },
    save() {
      return new Promise(resolve => {
        resolve(this.myDiagram.model.toJson())
      })

    },
    // 加载
    load() {
      this.myDiagram.model = go.Model.fromJson(this.goData)
    },
    printDiagram() {
      let svgWindow = window.open()
      if (!svgWindow) return  // failure to open a new Window
      let printSize = new go.Size(700, 960)
      let bands = this.myDiagram.documentBounds
      let x = bands.x
      let y = bands.y
      while (y < bands.bottom) {
        while (x < bands.right) {
          let svg = this.myDiagram.makeSvg({ scale: 1.0, position: new go.Point(x, y), size: printSize })
          svgWindow.document.body.appendChild(svg)
          x += printSize.width
        }
        x = bands.x
        y += printSize.height
      }
      setTimeout(function() {
        svgWindow.print()
      }, 1)
    },
    showLinkLabel(e) {
      let label = e.subject.findObject('LABEL')
      if (label !== null) label.visible = (e.subject.fromNode.data.category === 'Conditional')
    },
    animateFadeDown(e) {
      let diagram = e.diagram
      let animation = new go.Animation()
      animation.isViewportUnconstrained = true
      animation.easing = go.Animation.EaseOutExpo
      animation.duration = 900
      // Fade "down", in other words, fade in from above
      animation.add(diagram, 'position', diagram.position.copy().offset(0, 200), diagram.position)
      animation.add(diagram, 'opacity', 0, 1)
      animation.start()
    },

    nodeStyle() {
      return [
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          locationSpot: go.Spot.Center
        }
      ]
    },
    makePort(name, align, spot, output, input) {
      let $ = go.GraphObject.make
      let horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom)
      return $(go.Shape, {
        fill: 'transparent',  // changed to a color in the mouseEnter event handler
        strokeWidth: 0,  // no stroke
        width: horizontal ? NaN : 8,  // if not stretching horizontally, just 8 wide
        height: !horizontal ? NaN : 8,  // if not stretching vertically, just 8 tall
        alignment: align,  // align the port on the main Shape
        stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
        portId: name,  // declare this object to be a "port"
        fromSpot: spot,  // declare where links may connect at this port
        fromLinkable: output,  // declare whether the user may draw links from here
        toSpot: spot,  // declare where links may connect at this port
        toLinkable: input,  // declare whether the user may draw links to here
        cursor: 'pointer',  // show a different cursor to indicate potential link point
        mouseEnter: function(e, port) {  // the PORT argument will be this Shape
          if (!e.diagram.isReadOnly) port.fill = 'rgba(255,0,255,0.5)'
        },
        mouseLeave: function(e, port) {
          port.fill = 'transparent'
        }
      })
    },
    textStyle() {
      return {
        font: 'bold 11pt Lato, Helvetica, Arial, sans-serif',
        stroke: '#F8F8F8'
      }
    },
    test(e, node) {
      this.$emit('double', node)
    },
    updateGo(para){
      this.myDiagram.model.updateTargetBindings(para.data)
      console.log(para.part.data)
    }
  },
  mounted() {
    this.initChart()
  }
}
</script>

<template>
  <div style="width: 100%; display: flex; justify-content: space-between" >
    <div id="myPaletteDiv" style="width: 100px; margin-right: 2px; background-color: #282c34;"></div>
    <div id="myDiagramDiv" style="flex-grow: 1; height: 750px; background-color: #282c34;"></div>
  </div>
</template>

<style scoped>

</style>
