const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const path = require('path');
const { env } = require('process');
const app = express();

const base_url = "http://localhost:3000"

app.set("views" , path.join(__dirname , "/public/views"))
app.set("view engine" , "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.use(express.static(__dirname + "/public"))
//-------------------------------------Booking---------------------------------------
app.get("/Booking", async (req, res) => {
  try {
      const response = await axios.get("http://localhost:3000/Booking/");
    console.log(response.data);
      res.render("Booking/BookingAll", { Bookings: response.data });
  } catch(err) {
      res.status(500).send(err);
  }
});

app.get("/Booking/:id", async (req, res) => {
  try {
      const response = await axios.get(base_url + "/Booking/" + req.params.id);
      res.render("Booking/Booking", { Booking: response.data });
  } catch(err) {
      res.status(500).send(err);
  }
});

app.get("/Bookings/create", async (req, res) => {
  try {
  res.render("Booking/create");
} catch(err) {
  res.status(500).send(err)
}   
});

app.post('/Bookings/create', async (req, res) => {
  try {
      const data = {
        Booking_id: req.body.Booking_id,
        User_id: req.body.User_id,
        Type_id: req.body.Type_id,
        Room: req.body.Room
      };
      await axios.post(base_url + "/Booking/", data); 
      res.redirect("/Booking/");
  } catch (error) {
      res.status(500).send(error);
  }
});

app.get("/Booking/update/:id", async (req, res) => {
  try {         
      const response = await axios.get(base_url + "/Booking/" + req.params.id);
      res.render("Booking/update", { Booking: response.data });
  } catch(err) {
      res.status(500).send(err);
  }
});

app.post("/Booking/update/:id", async (req, res) => {
  try {
      const data = {
        Booking_id: req.body.Booking_id,
        User_id: req.body.User_id,
        Type_id: req.body.Type_id,
        Room: req.body.Room
      };
      await axios.put(base_url + '/Booking/' + req.params.id, data); 
      res.redirect('/Booking/');
  } catch (error) {
      res.status(500).send(error);
  }
});

app.get("/Booking/delete/:id", async (req, res) => {
  try {
      await axios.delete(base_url + "/Booking/" + req.params.id);
      res.redirect("/Booking");
  } catch(err) {
      res.status(500).send(err);
  }
});



//--------------------------Room--------------------------------------------
/*app.get("/Room", async (req, res) => {
  try {
      const response = await axios.get("http://localhost:3000/Room/");
    console.log(response.data);
      res.render("Room/BookingAll", { bookings: response.data });
  } catch(err) {
      res.status(500).send(err);
  }
});

app.get("/Booking/:id", async (req, res) => {
  try {
      const response = await axios.get(base_url + "/Booking/" + req.params.id);
      res.render("Booking/Booking", { Booking: response.data });
  } catch(err) {
      res.status(500).send(err);
  }
});

app.get("/Bookings/create", async (req, res) => {
  try {
  res.render("Bookings/create");
} catch(err) {
  res.status(500).send(err)
}   
});

app.post('/Bookings/create', async (req, res) => {
  try {
      const data = {
        Booking_id: req.body.Booking_id,
        User_id: req.body.User_id,
        Type_id: req.body.Type_id,
        Room: req.body.Room
      };
      await axios.post(base_url + 'Bookings/', data); 
      res.redirect('/Booking/');
  } catch (error) {
      res.status(500).send(error);
  }
});

app.get("/Booking/update/:id", async (req, res) => {
  try {         
      const response = await axios.get(base_url + "/Booking/" + req.params.id);
      res.render("Booking/update", { orders: response.data });
  } catch(err) {
      res.status(500).send(err);
  }
});

app.post("/Booking/update/:id", async (req, res) => {
  try {
      const data = {
        Booking_id: req.body.Booking_id,
        User_id: req.body.User_id,
        Type_id: req.body.Type_id,
        Room: req.body.Room
      };
      await axios.put(base_url + '/Booking/' + req.params.id, data); 
      res.redirect('/Booking/');
  } catch (error) {
      res.status(500).send(error);
  }
});

app.get("/Booking/delete/:id", async (req, res) => {
  try {
      await axios.delete(base_url + "/Booking/" + req.params.id);
      res.redirect("/Booking");
  } catch(err) {
      res.status(500).send(err);
  }
});
// User

//----------------------------------------orders----------------------------

app.get("/orders", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:3000/orders/");
        res.render("orders/ordersAll", { orders: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
});

app.get("/orders/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/orders/" + req.params.id);
        res.render("orders/orders", { orders: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
});

app.get("/order/create", async (req, res) => {
    try {
    res.render("orders/create");
} catch(err) {
    res.status(500).send(err)
}   
});

app.post('/order/create', async (req, res) => {
    try {
        const data = {
            orders_id: req.body.orders_id,
            products_id: req.body.products_id,
            user_id: req.body.user_id
        };
        await axios.post(base_url + '/orders/', data); 
        res.redirect('/orders/');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/orders/update/:id", async (req, res) => {
    try {         
        const response = await axios.get(base_url + "/orders/" + req.params.id);
        res.render("orders/update", { orders: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
});

app.post("/orders/update/:id", async (req, res) => {
    try {
        const data = {
            orders_id: req.body.orders_id,
            products_id: req.body.products_id,
            user_id: req.body.user_id
        };
        await axios.put(base_url + '/orders/' + req.params.id, data); 
        res.redirect('/orders/');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/orders/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + "/orders/" + req.params.id);
        res.redirect("/orders");
    } catch(err) {
        res.status(500).send(err);
    }
});

//categorie

app.get("/categories", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:3000/categories/");
        res.render("categories/categoriesAll", { categories: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
});

app.get("/categories/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/categories/" + req.params.id);
        res.render("categories/categories", { categories: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
});

app.get("/categorie/create", async (req, res) => {
    try {
        res.render("categories/create");
    } catch(err) {
        res.status(500).send(err)
    }   
});

app.post('/categorie/create', async (req, res) => {
    try {
        const data = {
            category_id: req.body.categories_id,
            category_name: req.body.categories_name,
        };
        await axios.post(base_url + '/categories/', data); 
        res.redirect('/categories/');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/categories/update/:id", async (req, res) => {
    try {         
        const response = await axios.get(base_url + "/categories/" + req.params.id);
        res.render("categories/update", { categories: response.data });
    } catch(err) {
        res.status(500).send(err);
    }
});

app.post("/categories/update/:id", async (req, res) => {
    try {
        const data = {
            category_name: req.body.category_name,
        };
        await axios.put(base_url + '/categories/' + req.params.id, data); 
        res.redirect('/categories/');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/categories/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + "/categories/" + req.params.id);
        res.redirect("/categories");
    } catch(err) {
        res.status(500).send(err);
    }
});*/

app.listen(5500 , () => {
    console.log("Server start on port 5500")
})