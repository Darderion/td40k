
class Drawer {
    constructor(canvas,numOfColumns,numOfRows,width,height,map){
        this.canvas = canvas
        this.numOfColumns = numOfColumns
        this.numOfRows = numOfRows
        this.width = width
        this.height = height
        this.blockWidth = width/numOfRows
        this.blockHeight = height/numOfColumns
        this.map = map

        this.ctx = canvas.getContext('2d')
        this.ctx.canvas.width =  width
        this.ctx.canvas.height = height   
    }
    draw(){ 
        for (let x = 1; x < this.numOfColumns;x++){
            for(let y = 1; y < this.numOfRows;y++){
                this.ctx.beginPath()
                this.ctx.moveTo(x*this.blockWidth,y*this.blockHeight);
                this.ctx.lineTo((x+1)*this.blockWidth,y*this.blockHeight);
                this.ctx.strokeStyle = this.map.tiles[x][y].neighbors[0].passable ? "black" : "red";
                this.ctx.stroke();
                
                this.ctx.beginPath();
                this.ctx.moveTo(x*this.blockWidth,y*this.blockHeight);
                this.ctx.lineTo(x*this.blockWidth,(y+1)*this.blockHeight);
                this.ctx.strokeStyle = this.map.tiles[x][y].neighbors[1].passable ? "black" : "red";
                this.ctx.stroke();
            }
        }
        for(let y = 0; y < this.numOfColumns-1; y++){
            let x = 0;
            this.ctx.beginPath();
            this.ctx.moveTo(x*this.blockWidth,(y+1)*this.blockHeight)
            this.ctx.lineTo((x+1)*this.blockWidth,(y+1)*this.blockHeight)
            this.ctx.strokeStyle = this.map.tiles[x][y].neighbors[2].passable ? "black" : "red";
            this.ctx.stroke();
        }
        for(let x = 0; x < this.numOfRows-1; x++){
            let y = 0;
            this.ctx.beginPath();
            this.ctx.moveTo((x+1)*this.blockWidth,y*this.blockHeight);
            this.ctx.lineTo((x+1)*this.blockWidth,(y+1)*this.blockHeight);
            this.ctx.strokeStyle = this.map.tiles[x][y].neighbors[3].passable ? "black" : "red";
            this.ctx.stroke();
        }
    }   
}     

module.exports = Drawer;

