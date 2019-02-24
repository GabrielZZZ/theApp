import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { GenericProvider } from '../../providers/generic/generic';
import { Platform } from 'ionic-angular';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
declare let cordova;


const MONTHLYLYL_KEY = '';//get from itunes.connect; need developer certificates
const CRYSTALS_KET = '';//also change the top id in config.xml
const GAMEMODE_KEY = '';

@Component({
    selector: 'page-pay',
    templateUrl: 'pay.html'
})
export class PayPage{

  products = [];
  //example variables
  //needs to be changed later
  crystalCount = 0;
  specialGame = false;
  monthlySub = false;
  previousPurchases = [];

  constructor(public navCtrl: NavController, private plt: Platform, private iap: InAppPurchase){
    this.plt.ready().then(() => {
      this.iap.getProducts([MONTHLYLYL_KEY, CRYSTALS_KET, GAMEMODE_KEY])
      .then(products => {
        console.log('Products: ', products);
        this.products = products;
      })
    })
    .catch(err => {
      console.log('my err: ', err);
    });
  }

  buy(product){
    this.iap.buy(product).then(data => {
      this.enableItems(product);
    })
  }

  restore(){
    //restore the previous purchase
    this.iap.restorePurchases().then(purchase => {
      this.previousPurchases = purchase;

      for(let prev of this.previousPurchases){
        this.enableItems(prev.productID);
      }
    })
  }

  enableItems(id){
    if(id === CRYSTALS_KET){
      this.crystalCount += 100;
    }
    else if(id === GAMEMODE_KEY){
      this.specialGame = true;
    }
    else if(id === MONTHLYLYL_KEY){
      this.monthlySub = true;
    }
  }
}
