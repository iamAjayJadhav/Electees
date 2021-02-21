
let cartItems = document.getElementById('cartItems');
let subtotal = document.getElementById('subtottal');
let navbartotal = document.getElementById('navtotal');
let navcount = document.getElementById('navcount');

let shoppingitems = document.getElementById('shoppingitems');
let itemArray = [];
let CheckoutCount = document.getElementById('CheckoutCount');
let sortby = document.getElementById('sortby');





let getdata = () => {
    fetch('https://j-parre.myshopify.com/products.json').then((res) => {
        return res.text();

    }).then((data) => {

        CheckoutCount.className = "space";
        CheckoutCount.textContent = 0;
        navcount.textContent = 0;
        navcount.className = "space";

        total = 0.00;
        subtotal.textContent = `₹ ${total.toFixed(2)}`;
        navbartotal.textContent = ` ₹ ${total.toFixed(2)}`;

        let fetchedData = JSON.parse(data).products;

        // Default Sorting
        fetchedData.sort(function (a, b) {
            return a.variants[0].price - b.variants[0].price
        });

        createData(fetchedData);

        //Remove Items from basket
        cartItems.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete')) {
                let li = e.target.parentElement;
                let x = fetchedData.filter(obj => {
                    return (obj.id == li.id);
                });
                cartItems.removeChild(li);
                CheckoutCount.textContent = cartItems.querySelectorAll('li').length;
                navcount.textContent = cartItems.querySelectorAll('li').length;
                total -= +(x[0].variants[0].price);


                subtotal.textContent = `₹ ${Math.abs(total).toFixed(2)}`;
                navbartotal.textContent = ` ₹ ${total.toFixed(2)}`;
            }

        })

        // Sorting the data
        sortby.addEventListener('change', (e) => {
            let itemLists = document.getElementById('itemLists');
            while (itemLists.firstChild) {
                itemLists.removeChild(itemLists.firstChild);
            }
            if (e.target.value == 1) {

                //Sort by price low to high
                fetchedData.sort(function (a, b) {
                    return a.variants[0].price - b.variants[0].price
                });
                createData(fetchedData);

            } else if (e.target.value == 2) {

                //Sort by price high to low
                fetchedData.sort(function (a, b) {
                    return b.variants[0].price - a.variants[0].price
                });
                createData(fetchedData);

            }
            if (e.target.value == 3) {

                //sort by name A -> Z
                fetchedData.sort(function (a, b) {
                    const title1 = a.title.toUpperCase(); // ignore upper and lowercase
                    const title2 = b.title.toUpperCase(); // ignore upper and lowercase
                    if (title1 < title2) {
                        return -1;
                    }
                    if (title1 > title1) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });
                createData(fetchedData);

            }
            if (e.target.value == 4) {
                //sort by name Z -> A
                fetchedData.sort(function (a, b) {
                    const title1 = a.title.toUpperCase(); // ignore upper and lowercase
                    const title2 = b.title.toUpperCase(); // ignore upper and lowercase
                    if (title1 > title2) {
                        return -1;
                    }
                    if (title1 < 2) {
                        return 1;
                    } // names must be equal return 0;
                });
                createData(fetchedData);
            }

        });



    }).catch((err) => {
        console.log(`ERROR ${err}`);

    })

}

let createData = (fetchedData) => {

    for (let i = 0; i < fetchedData.length; i++) {


        //Creating a card
        let card = document.createElement('div');
        card.className = "card";


        //create div to add Images and details
        let container = document.createElement('div');

        //creating Item image element
        let cardImg = document.createElement('img');
        cardImg.src = fetchedData[i].images[0].src;
        cardImg.className = "image";


        //creating Item detail element
        let itemName = document.createElement('p');
        itemName.className = "itemName"
        itemName.textContent = fetchedData[i].title.toUpperCase();


        //creating Item size dropdown element
        let ItemSize = document.createElement('select');
        ItemSize.id = fetchedData[i].id;


        //creating size dropdown
        for (let j = 0; j < fetchedData[i].options[0].values.length; j++) {
            let option = document.createElement('option');
            option.textContent = fetchedData[i].options[0].values[j];
            ItemSize.add(option)
        }

        //creating Item price element
        let ItemPrice = document.createElement('span');
        ItemPrice.className = "price";
        ItemPrice.textContent = `₹ ${fetchedData[i].variants[0].price}`;
        ItemPrice.id = fetchedData[i].id;


        //creating Buttons for cards
        let Add2cartButton = document.createElement('input');
        Add2cartButton.setAttribute('type', "button");
        Add2cartButton.className = "button add2C";
        Add2cartButton.value = "ADD TO CART"
        Add2cartButton.id = fetchedData[i].id;


        //Adding to cart
        Add2cartButton.addEventListener('click', (e) => {
            let x = fetchedData.filter(obj => {
                return (obj.id == e.target.id);
            });


            let li = document.createElement('li');
            li.id = e.target.id;

            let itemSize = document.createElement('p');
            let Itemprice = document.createElement('span');
            Itemprice.textContent = `₹  ${x[0].variants[0].price}`;
            Itemprice.className = "cartPrice"
            itemSize.textContent = document.getElementById(e.target.id).value;
            itemSize.className = "cartSize";

            itemSize.appendChild(Itemprice);
            li.className = "list-item";
            li.appendChild(document.createTextNode(x[0].title));
            let delbut = document.createElement('button');
            delbut.className = 'delete';
            delbut.textContent = "x";
            li.appendChild(delbut);
            li.appendChild(itemSize);
            cartItems.appendChild(li);
            CheckoutCount.className = "space";
            CheckoutCount.textContent = cartItems.querySelectorAll('li').length;
            navcount.textContent = cartItems.querySelectorAll('li').length;
            total += +(x[0].variants[0].price);


            subtotal.textContent = `₹ ${total.toFixed(2)}`;
            navbartotal.textContent = ` ₹ ${total.toFixed(2)}`;

        });


        let QuickView = document.createElement('input');
        QuickView.setAttribute('type', "button");
        QuickView.className = "button";
        QuickView.value = "QUICK VIEW";


        QuickView.addEventListener('click', (e) => {

            // creating Modals for quickview
            let modal = document.createElement('div');
            modal.id = "modal";
            modal.className = "modal"
            let modalcontent = document.createElement('div');
            modalcontent.className = "modal-content"
            let close = document.createElement('button');
            close.className = "close-button"
            close.textContent = "X";

            let imgdiv = document.createElement('div');
            let img = document.createElement('img');
            img.src = fetchedData[i].images[0].src;
            img.className = "imageDiv";
            imgdiv.appendChild(img);

            let titlediv = document.createElement('div');
            let title = document.createElement('h1');
            title.textContent = fetchedData[i].title.toUpperCase();
            titlediv.className = "titleDiv"
            titlediv.appendChild(title);




            let prodDet = document.createElement('div');
            prodDet.className = "prodDet"
            prodDet.innerHTML = fetchedData[0].body_html;






            let SizesL = document.createElement('div');
            SizesL.className = "sizeL";
            for (let j = 0; j < fetchedData[i].options[0].values.length; j++) {
                let sizes = document.createElement('li');
                sizes.appendChild(document.createTextNode(fetchedData[i].options[0].values[j]));
                SizesL.appendChild(sizes);
                sizes.className = "sizes";

            }
            let tags = document.createElement('p');
            let tag = document.createElement('span');
            for (let j = 0; j < fetchedData[i].tags.length; j++) {
                tag.className = "tags";

                tag.textContent = fetchedData[i].tags[j].toUpperCase();
            }

            let vendor = document.createElement('span')
            vendor.className = "tags";
            vendor.textContent = fetchedData[i].vendor;


            let det = document.createElement('div');
            det.className = "det";
            det.appendChild(prodDet);
            det.appendChild(SizesL);

            tags.appendChild(tag);
            tags.appendChild(vendor);




            modalcontent.appendChild(close);
            modalcontent.appendChild(titlediv);
            modalcontent.appendChild(imgdiv);
            modalcontent.appendChild(det);
            modalcontent.appendChild(tags);

            modal.appendChild(modalcontent);
            document.body.appendChild(modal);

            modal.classList.toggle("show-modal");
            close.addEventListener('click', () => {
                modal.classList.toggle("show-modal");
            })

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.toggle("show-modal");
                }
            })

        })





        //Create button
        let buttondiv = document.createElement('div');
        buttondiv.className = "buttondiv";
        buttondiv.appendChild(Add2cartButton);
        buttondiv.appendChild(QuickView);

        container.appendChild(itemName);
        container.appendChild(ItemSize);
        container.appendChild(ItemPrice);

        // Appending to card
        card.appendChild(cardImg);
        card.appendChild(container);
        card.appendChild(buttondiv);

        itemLists.appendChild(card);

        shoppingitems.appendChild(itemLists)


    }
}
