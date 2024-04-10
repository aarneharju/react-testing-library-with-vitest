import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.get('https://localhost:3030/scoops', () => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json({
        iceCreamFlavors: [
            {
                "name": "Mint chip",
                "imagePath": "/images/mint-chip.png" 
            },
            {
                "name": "Vanilla",
                "imagePath": "/images/vanilla.png" 
            },
        ]
    })
  }),
]