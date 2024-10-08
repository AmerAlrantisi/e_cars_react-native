export const homeData = () => {
  return `*[_type == "home"]{
    name,
    title,
    images[]{
      asset->{
        url
      }
    },
    phoneNumber,
     mainImage{
      asset->{
        url
      }
    },
    
    cars[]{
      carname,
      logoImage {
        asset->{
          url
        }
      },
      locations[]{
        locationName,
        chargingStation[]{
          StoreName,
          storeInfo[]{
            StoreFullName,
            price,
            phoneNumber,
                        phoneNumber2,

            location,
            time,
            locationFullName
          }
        },
        maintenanceCenter[]{
          StoreName,
          storeInfo[]{
            StoreFullName,
            price,
            phoneNumber,
                        phoneNumber2,

            location,
            time,
            locationFullName
          }
        },
        sparePartsStore[]{
          StoreName,
          storeInfo[]{
            StoreFullName,
            price,
            phoneNumber,
                        phoneNumber2,

            location,
            time,
            locationFullName
          }
        },
        accessoriesStore[]{
          StoreName,
          storeInfo[]{
            StoreFullName,
            price,
            phoneNumber,
            phoneNumber2,
            location,
            time,
            locationFullName
          }
        },
        chargerStore[]{
          StoreName,
          storeInfo[]{
            StoreFullName,
            price,
            phoneNumber,
                        phoneNumber2,

            location,
            time,
            locationFullName
          }
        },
        carShowroom[]{
          StoreName,
          storeInfo[]{
            StoreFullName,
            price,
            phoneNumber,
                        phoneNumber2,

            location,
            time,
            locationFullName
          }
        },
   services[]{
          winches[]{
            SName,
              ServiceStoreFullName,
              ServicePhoneNumber,
              ServiceLocation,
              servicelocation,
              time
            
          },
          chargeonroad[]{
            SName,
            
              ServiceStoreFullName,
              ServicePhoneNumber,
              ServiceLocation,
              servicelocation,
              time
            
          },
          dryclean[]{
            SName,
              ServiceStoreFullName,
              ServicePhoneNumber,
              ServiceLocation,
              servicelocation,
              time
            
}
            }
      }
    }
  }`;
};
