# Asset

In the context of EW-DOS, an Asset is a digital representation of a physical or virtual device on the Energy Web Chain. An Asset could represent, for example, a solar PV panel, a battery, an electric vehicle, or an IOT device. 

To read more about about Assets in EW-DOS, see the [documentation](https://energy-web-foundation.gitbook.io/energy-web/foundational-concepts/assets-in-ew-dos). 

The IAM Client Library contains the high-level functions for managing (registering, fetching, transferring ownership, etc.) Assets and their corresponding data. 

When a user registers an Asset using the [registerAsset](../api/classes/iam.IAM.md#registerasset) method, the user automatically becomes the owner of the Asset. Using the methods in the IAM client library:  

- The Asset owner can make an offer to transfer ownership of the Asset to another address.   
- The offeree can accept or reject the offer of Asset ownership.  
- The offerer can cancel the ownership offer request at any time before the offer is accepted. 


### Public APIs:
- [registerAsset](../api/classes/iam.IAM.md#registerasset): Register Asset to the user who initiates the method. This creates a record of the Asset on the Energy Web Chain.  
- [getAssetById](../api/classes/iam.IAM.md#getassetbyid): Fetch an Asset by its DID.
- [getAssetHistory](../api/classes/iam.IAM.md#getassethistory): Fetch an Asset's history by its DID.
- [getOfferedAssets](../api/classes/iam.IAM.md#getofferedassets): Fetch all Assets offered to a given DID. These are Assets that have been offered to the user, but not yet confirmed.
- [getOwnedAssets](../api/classes/iam.IAM.md#getownedassets): Fetch all Assets owned by a given DID.
- [getPreviouslyOwnedAssets](../api/classes/iam.IAM.md#getpreviouslyownedassets): Fetch all Assets previously owned by a given DID.    
- [offerAsset](../api/classes/iam.IAM.md#offerasset): Offer an Asset to a given address. 
- [rejectAssetOffer](../api/classes/iam.IAM.md#rejectassetoffer): Reject Asset ownership that has been offered to you as a user.

