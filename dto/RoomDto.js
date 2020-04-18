class RoomDto {
    constructor(camera, temperatura, umiditatea, nivelGaz, usa, foc, aer, apa) {
      this.camera = camera;
      this.temperatura = temperatura;
      this.umiditatea = umiditatea;
      this.nivelGaz = nivelGaz;
      this.usa = usa;
      this.foc = foc;
      this.aer = aer;   
      this.apa = apa;
    } //test
  }
  
  module.exports = RoomDto;