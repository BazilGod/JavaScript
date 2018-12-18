const Promise = require('bluebird');
const axios = require('axios');
const geolib = require('geolib');

let towns = ['Minsk', 'Rome', 'Berlin', 'Paris', 'Nice', 'Brest', 'Minsk', 'Copenhagen', 'Oslo', 'Brussels'];
let townsUrls = [];
for(let i = 0; i<towns.length; i++){
    townsUrls.push(axios.get(`https://geocode.xyz/${towns[i]}?json=1`));
}
Object.prototype.printElements = function(){
    let self = this.data.standard;
    console.log(self.city+' - '+self.countryname);
};
(async()=>{
   await  Promise.all(townsUrls.slice(0,3)).then((resolve, reject)=>{
        resolve.forEach(function (elements) {
            elements.printElements();
        });
    });

  await   Promise.any(townsUrls.slice(3,4)).then(function(resolve, reject){
        console.log(resolve.data.standard.city);
    });
    let coord = [];
  await   Promise.all([townsUrls[0], townsUrls[5]]).then((resolve, reject)=>{
        resolve.forEach(function (elements) {
            coord.push({latitude: elements.data.latt, longitude:elements.data.longt});
        });})
        .then(()=>{
            console.log('Lenght between Brest & Minsk '+geolib.getDistance(coord[0], coord[1]));
        });
    let coord1 = [];
  await   Promise.mapSeries(townsUrls.slice(6, 10), function(town){
        coord1.push({latitude: town.data.latt, longitude:town.data.longt});
        console.log(town.data.standard.city);
        console.log(town.data.latt +' '+town.data.longt);
    }).then(function(resolve, reject){
        console.log(geolib.findNearest(coord1[0], coord1, 1));
    });
})();