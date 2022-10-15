<h1 align="center">
  Wedding Template 1
</h1>

## Instalasi

1.  **Install Dependensi**

    ```shell
    npm install
    ```

2.  **Start development server.**

    ```shell
    npm run dev
    ```

    Website berjalan pada alamat http://localhost:8000!

    
## Kustomisasi

1. Edit website metadata pada [gatsby-config.ts](gatsby-config.ts)

    Lakukan kustomisasi pada judul website, deskripsi website dan alamat URL

    ```ts
    const config: GatsbyConfig = {
        siteMetadata: {
            title: "Pernikahan A & B",
            description: "This is description",
            siteUrl: `https://www.yourdomain.tld`,
        },
        // Other configuration.
    }
    ```

2. Edit wedding konfigurasi pada [content/config.json](content/config.json)

    ```js
    {
        // Konfigurasi Halaman landing
        "landing":{
            // Landing background image
            "background":"/images/wedding.jpg" 
        },
        // Konfigurasi Pengantin
        "bridegroom":[{
            // Nama pengantin
            "name":"Man Name", 
            // Nama lengkap pengantin
            "fullname":"Full Man Name, S.Teh", 
            // Foto pengantin
            "image":"/images/male.png", 
            // Teks pada section pengantin
            "text":"Putra Pertama dari pasangan", 
            // Data orang tua (bapak dan ibu)
            "parents":[{ 
                // Nama bapak
                "name":"Bapak bapak" 
            },{
                // Nama ibu
                "name":"Ibu ibu"    
            }]
        },{
            "name":"Female Name",
            "fullname":"Full Female Name, S.Jeruk",
            "image":"/images/female.png",
            "text":"Putri Terakhir dari pasangan",
            "parents":[{
                "name":"Father father"
            },{
                "name":"Mother mother"
            }]
        }],
        // Konfigurasi Halaman Undangan
        "invitation":{
            // Teks pembuka
            "text":"Assalamu'alaikum Warahmatullahi Wabarakatuh\nTanpa mengurangi rasa hormat. Kami bermaksud mengundang Bapak/Ibu/Sodara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami. Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai.\nDemikian undangan ini kami sampaikan. Kami memohon doa restu agar kami menjadi keluarga sakinah mawadah warrohmah. Atas perhatiannya, kami ucapkan terimakasih.\nWassalamu'alaikum Warahmatullahi Wabarakatuh",
            "background": "/images/merried.jpg",
            // Data Acara (Bisa kebih dari 2 acara)
            "events":[{
                // Nama acara
                "name":"Akad", 
                // Tempat cata dilaksanakan
                "place":{ 
                    // Nama tempat
                    "name":"Rumah", 
                    // Koordinat latitude
                    "latitude":"", 
                    // Koordinat longitude
                    "longitude":"" 
                },
                // Dari kapan acara berlangsung?
                "from":"2022-12-12T11:00:00+0700" 
            },{
                "name":"Resepsi",
                "place": {
                    "name":"Gedung",
                    "latitude":"",
                    "longitude":""
                },
                "from":"2022-12-13T09:00:00+0700",
                // Sampai kapan acara berlanguns. Jika kosong, maka "Sampai Selesai"
                "to":"2022-12-13T14:00:00+0700" 
            }],
            // Data gallery
            "gallery":[{
                // URL foto
                "src":"/images/wedding.jpg", 
                // Caption foto
                "caption":"This is caption for wedding.jpg" 
            },{
                "src":"/images/merried.jpg",
                "caption":"This is caption for merried.jpg"
            }]
        }
    }
    ```

## Build Website

1. Build website

    ```shell
    npm run build
    ```

2. Deploy

    File website terdapat pada folder */public*

    Anda dapat mendeploy folder *public* tersebut agar dapat diakses pada browser

    Atau jika menggunakan node js, dapat menjalankan script:

    ```shell
    npm run server
    ```