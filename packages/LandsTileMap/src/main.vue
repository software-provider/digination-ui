<template>
  <div class="hg-landsTileMap-wrapper">
    <!-- canvas start -->
    <canvas id="titleMapCanvas"
            class="titleMapCanvas"
            ref="titleMapCanvas"
            :width="canvasW"
            :height="canvasH"
            :style="{'background':canvasBgColor}">
    </canvas>
    <!-- canvas end -->
  </div>
</template>

<script>
export default {
  name: 'DigiLandsTileMap',
  props: {
    tileMapMapmatrix: {
      type: Array,
      default: () => ([])
    },
    tileMapBlockMapmatrix: {
      type: Array,
      default: () => ([])
    },
    tiledDigitalColormap: {
      type: Array,
      default: () => ([])
    },
    canvasWidth: {
      type: Number,
      default: window.innerWidth,
    },
    canvasHeight: {
      type: Number,
      default: window.innerHeight,
    },
    tileSize: {
      type: Number,
      default: 32,
    },
    tileScale: {
      type: Number,
      default: 1,
    },
    startPaintingX: {
      type: Number,
      default: 0,
    },
    startPaintingY: {
      type: Number,
      default: 0,
    },
    gridLineColor: {
      type: String,
      default: '#c8efd4'
    },
    gridDefaultTileColor: {
      type: String,
      default: '#ffffff'
    },
    canvasBgColor: {
      type: String,
      default: '#acb8e9'
    },
    xyAxisPosition: {
      type: String,
      default: 'left-top'
    },
    debug: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      myCanvas: null,
      ctx: null,
      map: [],
      paintingX: this.startPaintingX,
      paintingY: this.startPaintingY,
      size: this.tileSize,
      scale: this.tileScale,
      canvasW: this.canvasWidth,
      canvasH: this.canvasHeight,
      model: {},
      xyAxisPositionList: ['left-top', 'left-middle', 'left-bottom', 'middle-top', 'middle-middle', 'middle-bottom', 'right-top', 'right-middle', 'right-bottom'],
      matrixWidth: 0,
      matrixHeight: 0,
    };
  },
  watch: {
    // tileMapMapmatrix: {
    //   deep: true,
    //   handler (newVal, oldVal) {
    //     this.tileMapMapmatrix = newVal;
    //   }
    // }
  },
  mounted () {
    this.myCanvas = this.$refs.titleMapCanvas;
    this.ctx = this.myCanvas.getContext('2d');
    if (this.tileMapMapmatrix.length > 0) {
      var tileMapMapmatrix = this.clone(this.tileMapMapmatrix);
      if (this.tileMapBlockMapmatrix.length > 0) {
        tileMapMapmatrix = this.blockCoverage(tileMapMapmatrix, this.tileMapBlockMapmatrix);
      }
      this.drawImage(tileMapMapmatrix);
      this.map = this.tileMapMapmatrix;
      this.canvasEventsInit();
      var _this = this;
      window.onresize = function () {
        let browserWidth = window.innerWidth;
        let browserHeight = window.innerHeight;
        _this.resizeCanvas(browserWidth, browserHeight);
      };
    }

  },
  methods: {
    resizeCanvas (w, h) {
      var _this = this;
      this.canvasW = w;
      this.canvasH = h;
      var imgData = this.ctx.getImageData(0, 0, this.myCanvas.width, this.myCanvas.height);
      this.myCanvas.width = this.canvasW;
      this.myCanvas.height = this.canvasH;
      setTimeout(() => {
        _this.ctx.putImageData(imgData, 0, 0);
      }, 0);
    },
    async drawImage (map) {
      var _this = this;
      _this.matrixWidth = map.length;
      _this.matrixHeight = map[0].length;
      _this.ctx.clearRect(0, 0, _this.myCanvas.width, _this.myCanvas.height);
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = this.gridLineColor;
      this.ctx.beginPath();
      for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
          const tileMapVal = map[row][column];
          var fillStyle = this.getGridTileColor(tileMapVal);
          if (typeof (this.model.SizeimgX) !== 'undefined') {
            if (_this.model.SizeimgX === column && _this.model.SizeimgY === row) {
              fillStyle = '#3704ff';
            }
          }
          this.ctx.fillStyle = fillStyle;
          var SizeimgX = this.paintingX + (column * this.tileSize * this.scale);
          var SizeimgY = this.paintingY + (row * this.tileSize * this.scale);
          this.ctx.fillRect(SizeimgX, SizeimgY, (1 * this.tileSize * this.scale), (1 * this.tileSize * this.scale));
          this.ctx.rect(SizeimgX, SizeimgY, (1 * this.tileSize * this.scale), (1 * this.tileSize * this.scale));
          this.ctx.stroke();
        }
      }
      var nc = document.createElement('canvas');
      this.ctx.drawImage(nc, 0, 0);
      this.myCanvas.addEventListener('click', this.handleClickTile)
    },
    canvasEventsInit () {
      var _this = this
      var canvas = _this.myCanvas;
      canvas.onmousedown = function (event) {
        var imgx = _this.paintingX;
        var imgy = _this.paintingY;

        var pos = { x: event.clientX, y: event.clientY };
        canvas.onmousemove = function (evt) {
          canvas.style.cursor = 'move';
          var x = (evt.clientX - pos.x) * 2 + imgx;
          var y = (evt.clientY - pos.y) * 2 + imgy;
          _this.paintingX = x;
          _this.paintingY = y;
          _this.drawImage(_this.map);
        };
        canvas.onmouseup = function () {
          canvas.onmousemove = null;
          canvas.onmouseup = null;
          canvas.style.cursor = 'default';
        };
      };
      canvas.onmousewheel = canvas.onwheel = function (event) {
        var wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltaY * (-40));
        if (wheelDelta > 0) {
          if (_this.scale <= 1.1) {
            _this.scale += 0.1;
          }
        } else {
          if (_this.scale >= 0.9) {
            _this.scale -= 0.1;
          }
        }
        _this.drawImage(_this.map);
        event.preventDefault && event.preventDefault();
        return false;
      };
    },
    handleClickTile (event) {
      let clickX = Math.floor((event.offsetX - this.paintingX) / (this.size * this.scale));
      let clickY = Math.floor((event.offsetY - this.paintingY) / (this.size * this.scale));
      this.$set(this.model, 'SizeimgX', clickX);
      this.$set(this.model, 'SizeimgY', clickY);
      this.drawImage(this.map);
      let xyAxis = this.coordinateAxisConversion(clickX, clickY);
      this.$emit('handleClickTile', {
        clickX: clickX,
        clickY: clickY,
        x: xyAxis.clickX,
        y: xyAxis.clickY,
        event: event,
      });
    },
    coordinateAxisConversion (x, y) {
      let xyAxisPosition = this.xyAxisPosition;
      const matrixWidth = this.matrixWidth;
      const matrixHeight = this.matrixHeight;
      var xy = null;
      if (xyAxisPosition === 'left-top') {
        xy = {
          clickX: x,
          clickY: y,
        };
      } else if (xyAxisPosition === 'left-middle') {
        let WidthLine = 0;
        let heightLine = Math.ceil(matrixHeight / 2);
        xy = this.getXYAxis(WidthLine, heightLine, x, y);
      } else if (xyAxisPosition === 'left-bottom') {
        let WidthLine = 0;
        let heightLine = matrixHeight;
        xy = this.getXYAxis(WidthLine, heightLine, x, y);
      } else if (xyAxisPosition === 'middle-top') {
        let WidthLine = Math.ceil(matrixWidth / 2);
        let heightLine = 0;
        xy = this.getXYAxis(WidthLine, heightLine, x, y);
      } else if (xyAxisPosition === 'middle-bottom') {
        let WidthLine = Math.ceil(matrixWidth / 2);
        let heightLine = matrixHeight;
        xy = this.getXYAxis(WidthLine, heightLine, x, y);
      } else if (xyAxisPosition === 'right-top') {
        let WidthLine = matrixWidth;
        let heightLine = 0;
        xy = this.getXYAxis(WidthLine, heightLine, x, y);
      } else if (xyAxisPosition === 'right-middle') {
        let WidthLine = matrixWidth;
        let heightLine = Math.ceil(matrixHeight / 2);
        xy = this.getXYAxis(WidthLine, heightLine, x, y);
      } else if (xyAxisPosition === 'right-bottom') {
        let WidthLine = matrixWidth;
        let heightLine = matrixHeight;
        xy = this.getXYAxis(WidthLine, heightLine, x, y);
      } else {
        let WidthLine = Math.ceil(matrixWidth / 2);
        let heightLine = Math.ceil(matrixHeight / 2);
        xy = this.getXYAxis(WidthLine, heightLine, x, y);
      }
      return {
        clickX: xy.clickX,
        clickY: xy.clickY,
      };
    },
    getXYAxis (sourceX, sourceY, x, y) {
      let newX = x - sourceX;
      let newY = y - sourceY;
      return {
        clickX: newX,
        clickY: newY,
      };
    },
    handleClickAssignRender (tileMap) {
      this.nmp = tileMap;
      this.$set(this, 'map', tileMap);
      this.drawImage(this.nmp);
    },
    blockCoverage (primitiveMatrix, currentMatrix) {
      var data = this.clone(primitiveMatrix);
      for (let row = 0; row < data.length; row++) {
        for (let column = 0; column < data[row].length; column++) {
          if (currentMatrix[row][column] !== 0) {
            data[row][column] = currentMatrix[row][column];
          }
        }
      }
      return data;
    },
    clone (Obj) {
      var buf;
      if (Obj instanceof Array) {
        buf = [];
        var i = Obj.length;
        while (i--) {
          buf[i] = this.clone(Obj[i]);
        }
        return buf;
      } else if (Obj instanceof Object) {
        buf = {};
        for (var k in Obj) {
          buf[k] = this.clone(Obj[k]);
        }
        return buf;
      } else {
        return Obj;
      }
    },
    getGridTileColor (tileMapVal) {
      var gridTileColor = this.gridDefaultTileColor;
      this.tiledDigitalColormap.forEach((item) => {
        if (typeof (item[tileMapVal]) !== 'undefined' && item[tileMapVal]) {
          gridTileColor = item[tileMapVal];
        }
      });
      return gridTileColor;
    }
  }
};
</script>