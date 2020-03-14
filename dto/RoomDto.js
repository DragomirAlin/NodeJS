class RoomDto {
    constructor(camera, temperatura, umiditatea, nivelGaz, usaIntrare) {
      this.camera = camera;
      this.temperatura = temperatura;
      this.umiditatea = umiditatea;
      this.nivelGaz = nivelGaz;
      this.usaIntrare = usaIntrare;
    }
  }
  
  module.exports = RoomDto;