# Chargemap GraphQl API

## Server URL:  http://tamanji.jelastic.metropolia.fi/graphql

## Mutations:
 * ### addStation

        addStation- Use Query Variables: {"Location": {"coordinates": [60.2040745,24.6657767]},"Connections":[{"Quantity":3,"ConnectionTypeID":"5e39eecac5598269fdad81a1","LevelID":"5e39edf7bb7ae768f05cf2bd","CurrentTypeID":"5e39ef4a6921476aaf62404a"}],"Postcode":"02720","Title":"Entresse","AddressLine1":"Siltakatu 11","StateOrProvince":"Uusimaa","Town":"Espoo"}

         mutation AddStation($Location: PointInput!, $Connections: [ConnectionInput]!, $Postcode: String! $Title: String!, $AddressLine1: String!, $StateOrProvince: String!, $Town: String!) {
           addStation( 
                Location: $Location,
                Connections: $Connections,
                Postcode: $Postcode,
                Title: $Title,
                AddressLine1: $AddressLine1,
                StateOrProvince: $StateOrProvince,
                Town: $Town,
             )
                {
                Title
                AddressLine1
                Town
                Connections {
                    Quantity
                    CurrentTypeID {
                        Title
                        Description
                    }
                    ConnectionTypeID {
                        Title
                        FormalName
                    }
                    LevelID {
                        Title
                        IsFastChargeCapable
                    }
                }
            }
        }
    
* ### modifyStation

        modifyStation - Use Query Variables: {"id":"606f1218b01f16791748b52f","Connections":[{"id": "5e590b0b7536c009841db37a","Quantity":5,"ConnectionTypeID":"5e39eecac5598269fdad81a1","LevelID":"5e39edf7bb7ae768f05cf2bd","CurrentTypeID":"5e39ef4a6921476aaf62404a"}],"Postcode":"02770","Title":"K-Market","AddressLine1":"Espoontori","StateOrProvince":"Uusimaa","Town":"Espoo"}

         mutation ModifyStation($id: ID!, $Connections: [ConnectionInput]!, $Postcode: String! $Title: String!, $AddressLine1: String!, $StateOrProvince: String!, $Town: String!) {
           modifyStation( 
                id: $id,
                Connections: $Connections,
                Postcode: $Postcode,
                Title: $Title,
                AddressLine1: $AddressLine1,
                StateOrProvince: $StateOrProvince,
                Town: $Town,
             )
                {
                Title
                AddressLine1
                Town
                id
            }
        }

* ### deleteStation

        deleteStation - Use ids: "606f1adfb01f16791748b533", "606f1b1eb01f16791748b537"
         
        mutation {
        deleteStation(id: "606f1a81b01f16791748b531"){
           id
          }
        }

## Query:
 * ### stations
        
        stations {
                Title
                Town
                AddressLine1
                Location {
                type
                coordinates
                }
                Connections {
                Quantity
                ConnectionTypeID {
                    Title
                }
                CurrentTypeID {
                    Title
                }
                LevelID {
                    Title
                    Comments
                    IsFastChargeCapable
                }
                }
            }
        }
        

        # filtering by geo polygon/ boundaries 

            {
        stations(bounds: {_southWest: {lat: 60.0918986743294, lng: 24.60319519042969}, _northEast: {lat: 60.38196898834704, lng: 24.94033813476563}}, limit:5) {
            Title
            Town
            AddressLine1
            Location {
            type
            coordinates
            }
            Connections {
            Quantity
            ConnectionTypeID {
                Title
            }
            CurrentTypeID {
                Title
            }
            LevelID {
                Title
                Comments
                IsFastChargeCapable
            }
            }
        }
        }
        
         # query station with start and limit parameters

            {
            stations(start: 20, limit: 2) {
                Title
                Town
                AddressLine1
                Location {
                type
                coordinates
                }
                Connections {
                Quantity
                ConnectionTypeID {
                    Title
                }
                CurrentTypeID {
                    Title
                }
                LevelID {
                    Title
                    Comments
                    IsFastChargeCapable
                }
                }
            }
        }

        # query station by id, use id:  "5e590b0b7536c009841db37c" 

            {
            station(stationID: "5e590b0b7536c009841db37c") {
                Title
                Town
                AddressLine1
                Location {
                type
                coordinates
                }
                Connections {
                Quantity
                ConnectionTypeID {
                    Title
                }
                CurrentTypeID {
                    Title
                }
                LevelID {
                    Title
                    Comments
                    IsFastChargeCapable
                }
                }
            }
        }








