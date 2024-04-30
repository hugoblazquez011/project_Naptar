package opo.backend.backend;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;




import org.bson.Document;
import org.bson.UuidRepresentation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;

import static com.mongodb.client.model.Updates.*;


@RestController
public class UserController {
    private static String dataBaseURL = "mongodb+srv://hugo:Aa1234567890@naptar.acoc8it.mongodb.net/?retryWrites=true&w=majority&appName=Naptar";



    @GetMapping("/login")
    public ResponseEntity<String> login(
            @RequestParam ("emailUsername") String emailUsername,
            @RequestParam ("password") String password
        ){
        
            try {
                // Configurar la representación de UUID
                MongoClientSettings settings = MongoClientSettings.builder()
                    .applyConnectionString(new ConnectionString(dataBaseURL))
                    .uuidRepresentation(UuidRepresentation.STANDARD)
                    .build();
                
                // Crear el cliente de MongoDB
                try (MongoClient mongoClient = MongoClients.create(settings)) {
                    MongoDatabase database = mongoClient.getDatabase("Naptar");
                    MongoCollection<Document> collection = database.getCollection("Users");
                    if (emailUsername != null && password != null) {

                        Document docEmail = collection.find(
                            and(
                                eq("email", emailUsername),
                                eq("password", password)
                            )
                        ).first();
                        if (docEmail == null) {
                            Document docUsername = collection.find(
                                and(
                                    eq("username", emailUsername),
                                    eq("password", password)
                                )
                            ).first();
                            if (docUsername == null) {
                                return new ResponseEntity<>("Error: Datos incompletos", HttpStatus.BAD_REQUEST);   
                            }
                            return new ResponseEntity<>(docUsername.toJson(), HttpStatus.valueOf(200)); // Login done
                        }
                        return new ResponseEntity<>(docEmail.toJson(), HttpStatus.valueOf(200)); // Login done
                        
                    } else {
                        return new ResponseEntity<>("Error: Datos incompletos", HttpStatus.BAD_REQUEST);
                    }
                }
            } catch (Exception e) {
                System.err.println("Error creating MongoDB client: " + e);
                return new ResponseEntity<>("Error: Failed to create MongoDB client", HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

   @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password
    ) {
        
        try {
            // Configurar la representación de UUID
            MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(dataBaseURL))
                .uuidRepresentation(UuidRepresentation.STANDARD)
                .build();
            
            // Crear el cliente de MongoDB
            try (MongoClient mongoClient = MongoClients.create(settings)) {
                MongoDatabase database = mongoClient.getDatabase("Naptar");
                MongoCollection<Document> collection = database.getCollection("Users");
                if (email != null && password != null && firstName != null && lastName != null && username != null) {
                    
                    UUID _id = UUID.randomUUID();
                    try {
                        // Inserts a sample document describing a movie into the collection
                        InsertOneResult result = collection.insertOne(new Document()
                        .append("_id",_id)
                        .append("firstName",  firstName)
                        .append("lastName",lastName)
                        .append("username", username)
                        .append("email", email)
                        .append("password", password)
                        );
                        // Prints the ID of the inserted document
                        System.out.println("Success! Inserted document id: " + result.getInsertedId());
                        return new ResponseEntity<>("User Created correct with this id: "  + _id.toString(), HttpStatus.valueOf(201)); // Creada (Created)
                    // Prints a message if any exceptions occur during the operation
                    } catch (MongoException me) {
                        System.err.println("Unable to insert due to an error: " + me);
                        return new ResponseEntity<>("Error: Datos incompletos", HttpStatus.BAD_REQUEST);
                    }

                } else {
                    return new ResponseEntity<>("Error: Datos incompletos", HttpStatus.BAD_REQUEST);
                }
            }
        } catch (Exception e) {
            System.err.println("Error creating MongoDB client: " + e);
            return new ResponseEntity<>("Error: Failed to create MongoDB client", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
   
    @GetMapping("/getUserEvents")
    public ResponseEntity<String> getUserEvents(
            @RequestParam("user") String user
    ) {
        try {
            // Configurar la representación de UUID
            MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(dataBaseURL))
                .uuidRepresentation(UuidRepresentation.STANDARD)
                .build();
            
            // Crear el cliente de MongoDB
            try (MongoClient mongoClient = MongoClients.create(settings)) {
                MongoDatabase database = mongoClient.getDatabase("Naptar");
                MongoCollection<Document> collection = database.getCollection("Users");
                
                // Obtener el documento del usuario
                Document userDoc = collection.find(eq("username", user)).first();
                
                if (userDoc != null) {
                    // Usuario encontrado, obtener la lista de eventos
                    List<Document> events = userDoc.getList("events", Document.class);
                    if (events != null && !events.isEmpty()) {
                         // Convertir la lista de eventos a formato JSON
                        String eventsJson = new Gson().toJson(events);
                        
                        return new ResponseEntity<>(eventsJson, HttpStatus.OK);
                    }
                    else{
                        
                        return new ResponseEntity<>("Error: Events not found", HttpStatus.NOT_FOUND);
                    }
                } else {
                    // No se pudo encontrar al usuario
                    return new ResponseEntity<>("Error: User not found", HttpStatus.NOT_FOUND);
                }

            }
        } catch (Exception e) {
            System.err.println("Error creating MongoDB client: " + e);
            return new ResponseEntity<>("Error: Failed to create MongoDB client", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/getUserPreps")
    public ResponseEntity<String> getUserPreps(
            @RequestParam("user") String user
    ) {
        try {
            // Configurar la representación de UUID
            MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(dataBaseURL))
                .uuidRepresentation(UuidRepresentation.STANDARD)
                .build();
            
            // Crear el cliente de MongoDB
            try (MongoClient mongoClient = MongoClients.create(settings)) {
                MongoDatabase database = mongoClient.getDatabase("Naptar");
                MongoCollection<Document> collection = database.getCollection("Users");
                
                // Obtener el documento del usuario
                Document userDoc = collection.find(eq("username", user)).first();
                
                    if (userDoc != null) {
                        // Usuario encontrado, obtener la lista de eventos
                        List<Document> preps = userDoc.getList("preparations", Document.class);
                        if (preps != null && !preps.isEmpty()) {
                             // Convertir la lista de eventos a formato JSON
                            String prepsJson = new Gson().toJson(preps);
                            
                            return new ResponseEntity<>(prepsJson, HttpStatus.OK);
                        }
                        else{
                            
                            return new ResponseEntity<>("Error: Events not found", HttpStatus.NOT_FOUND);
                        }
                    } 
                    else 
                    {
                        // No se pudo encontrar al usuario
                        return new ResponseEntity<>("Error: User not found", HttpStatus.NOT_FOUND);
                    }
                
               

            }
        } catch (Exception e) {
            System.err.println("Error creating MongoDB client: " + e);
            return new ResponseEntity<>("Error: Failed to create MongoDB client", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/createEvent")
    public ResponseEntity<String> createEvent(
            @RequestParam("user") String user,
            @RequestParam("topic") String topic,
            @RequestParam("name") String name,
            @RequestParam("Date") String Date,
            @RequestParam("color") String color,
            @RequestParam("typeEvent") String typeEvent,
            @RequestParam("priority") String priorityString 
    ) {

        try {
            // Configurar la representación de UUID
            MongoClientSettings settings = MongoClientSettings.builder()
                    .applyConnectionString(new ConnectionString(dataBaseURL))
                    .uuidRepresentation(UuidRepresentation.STANDARD)
                    .build();

            // Crear el cliente de MongoDB
            try (MongoClient mongoClient = MongoClients.create(settings)) {

                MongoDatabase database = mongoClient.getDatabase("Naptar");
                MongoCollection<Document> collection = database.getCollection("Users");
                // Obtener el documento del usuario
                Document userDoc = collection.find(eq("username", user)).first();

                if (topic != null && name != null && Date != null) {

                    // Convertir la fecha de String a LocalDate (o cualquier otro formato de fecha que desees usar)
                    LocalDate eventDate = LocalDate.parse(Date);

                    // Crear el nuevo evento como un documento
                    Document newEvent = new Document("topic", topic)
                    .append("name", name)
                    .append("Date", eventDate)
                    .append("color", color)
                    .append("duration", 2);

                    // // Obtener eventos y preparaciones en formato JSON
                    List<Document> eventsList =  userDoc.getList("events", Document.class);

                    List<Document> prepsList =  userDoc.getList("preparations", Document.class);

                    Document configuration = userDoc.get("configuration", Document.class);
                    String h_start = configuration.getString("sHour");
                    String h_max = configuration.getString("eHour");
                    Integer n_break = Integer.parseInt(configuration.getString("nBreaks"));
                    String ET1 = configuration.getString("ET1");
                    String ET2 = configuration.getString("ET2");
                    String ET3 = configuration.getString("ET3");


                    Integer priority = Integer.parseInt(priorityString);
                    // Crear preparaciones para la fecha y actualizar la base de datos
                    prepsList = CreatePreparations(priority, topic, name, Date, color, typeEvent, eventsList,prepsList, h_start, h_max, n_break,ET1,ET2,ET3);
                    

                    // Actualizar el documento del usuario para añadir el nuevo evento a la lista de eventos
                    UpdateResult updateResult = collection.updateOne(
                            eq("username", user),
                            addToSet("events", newEvent)
                    );

                    //Insertar cada preparación individualmente en la lista de preparaciones en MongoDB
                    for (Document prep : prepsList) {
                        collection.updateOne(
                                eq("username", user),
                                addToSet("preparations", prep)
                        );
                    
                    }

                    if (updateResult.getModifiedCount() > 0 ) {

                        // El evento y las preparaciones se añadieron correctamente
                        return new ResponseEntity<>("Event and preparations added successfully to user: " + user, HttpStatus.valueOf(200));
                    } else {
                        // No se pudo encontrar al usuario
                        return new ResponseEntity<>("Error: User not found", HttpStatus.NOT_FOUND);
                    }
                
                }
                return new ResponseEntity<>("Empty Values", HttpStatus.NOT_FOUND);

            }
        } catch (Exception e) {
            System.err.println("Error creating MongoDB client: " + e);
            return new ResponseEntity<>("Error: Failed to create MongoDB client", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

   
    public List<Document> CreatePreparations(
            int priority, String topic, String name, String Date, String color, String typeEvent,List<Document> eventsList, List<Document> prepsList ,
            String h_start, String h_max, Integer n_break,
            String ET1,String ET2,String ET3) {
    
    
        Integer numberOfDays = 0;
        Integer numberOfHoursPerDay = 0;
        if (typeEvent.equals(ET1)) {
            if (priority > 2) {
                numberOfDays = priority * 2;
            } else {
                numberOfDays = priority + 2;
            }
            numberOfHoursPerDay = priority + 1;
        } else if (typeEvent.equals(ET2)) {
            if (priority > 2) {
                numberOfHoursPerDay = 2;
                numberOfDays = priority * 3;
            } else {
                numberOfDays = priority + 2;
                numberOfHoursPerDay = priority;
            }
        } else if (typeEvent.equals(ET3)) {
            if (priority > 2) {
                numberOfDays = priority - 1;
                numberOfHoursPerDay = (priority - 2) * 2;
            } else {
                numberOfDays = 1;
                numberOfHoursPerDay = priority + 1;
            }
        }
        // Convertir la fecha de String a LocalDate
        LocalDate startDate = LocalDate.parse(Date);

        for (int i = 1; i < numberOfDays +1; i++) {
            LocalDate newPreparationDate = startDate.minusDays(i);

            // Calcular las horas máximas disponibles para el nuevo día
            int h_Disponible = calculateHours(newPreparationDate, eventsList, prepsList, h_start, h_max, n_break);

            if (h_Disponible >= numberOfHoursPerDay) {

                // Crear el documento de preparación
               Document newPreparation = new Document("topic", topic)
               .append("name", name)
               .append("date", newPreparationDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
               .append("color", makeColorLighter(color, 20)) // Color a cambiar
               .append("duration", numberOfHoursPerDay); // Agregar la duracion

               // Agregar la preparación a la lista
               prepsList.add(newPreparation);


           }
            else {
                startDate = startDate.minusDays(1);
                i--;
            }

        }
    
        return prepsList;
    }

    public static String makeColorLighter(String hexColor, int amount) {
        // Eliminar el signo '#' del código hexadecimal
        hexColor = hexColor.replace("#", "");
    
        // Convertir el código hexadecimal a valores RGB
        int r = Integer.parseInt(hexColor.substring(0, 2), 16);
        int g = Integer.parseInt(hexColor.substring(2, 4), 16);
        int b = Integer.parseInt(hexColor.substring(4, 6), 16);
    
        // Aumentar cada valor RGB
        r = Math.min(r + amount, 255);
        g = Math.min(g + amount, 255);
        b = Math.min(b + amount, 255);
    
        // Convertir los nuevos valores RGB a código hexadecimal
        return String.format("#%02X%02X%02X", r, g, b);
    }

    private int calculateHours(LocalDate date, List<Document> events, List<Document> preps, String h_start, String h_max,  Integer n_break ) {
        // Obtener la lista de eventos y preparaciones para el día especificado
        List<Document> eventsList =  filterEventsForDate(events, date);
        List<Document> prepsList =filterPrepsForDate(preps, date);
        
        // Calcular la duración total de los eventos
        Integer totalEventHours = eventsList.stream()
                .mapToInt(event -> event.getInteger("duration"))
                .sum();
    
        // Calcular la duración total de las preparaciones
        Integer totalPrepHours = prepsList.stream()
                .mapToInt(prep -> prep.getInteger("duration"))
                .sum();

        Integer totalHDispoByConfig =calculateHourDifference(h_start ,h_max ) - (n_break/2) ; 

        int Hours = totalHDispoByConfig - (totalEventHours + totalPrepHours );
    
        return Hours;
    }
    
    public static Integer calculateHourDifference(String s1, String s2) {

        // Convertir las horas en minutos
        String[] parts1 = s1.split(":");
        String[] parts2 = s2.split(":");

        
        Integer hours1 = Integer.parseInt(parts1[0]);
        Integer minutes1 = Integer.parseInt(parts1[1]);
        
        Integer hours2 = Integer.parseInt(parts2[0]);
        Integer minutes2 = Integer.parseInt(parts2[1]);

        // Calcular la diferencia en minutos
        Integer diffMinutes = (hours2 - hours1) * 60 + (minutes2 - minutes1);

        // Redondear al número entero más cercano
        Integer roundedHours = Math.round(diffMinutes / 60f);

        // Si la diferencia es menor a 0, corregir el redondeo
        if (roundedHours < 0) {
            if (diffMinutes > -30) {
                roundedHours = -1;
            } else {
                roundedHours = 0;
            }
        }

        return roundedHours;
    }
    
    // Método para filtrar los eventos para una fecha específica
    
    private List<Document> filterEventsForDate(List<Document> events, LocalDate date) {
        return events.stream()
                .filter(evt -> {
                    // Obtener el valor de Date como un objeto Date
                    java.util.Date evtDate = (java.util.Date) evt.get("Date");
                    
                    // Verificar si el valor de Date es null
                    if (evtDate == null) {
                        return false; // Si es null, filtramos este documento
                    }
                    
                    // Convertir el objeto Date a LocalDate
                    LocalDate localDate = evtDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    
                    // Comparar con la fecha proporcionada
                    return localDate.equals(date);
                })
                .collect(Collectors.toList());
    }

    private List<Document>  filterPrepsForDate(List<Document> preps, LocalDate date) {
        return preps.stream()
                .filter(prep -> {
                    // Obtener el valor de Date como un String
                    Object prepDateObject = prep.get("Date");
                    
                    // Verificar si el valor de "Date" es null
                    if (prepDateObject == null) {
                        return false; // Si es null, filtramos este documento
                    }
                    
                    // Convertir el String a LocalDate
                    String prepDateString = prepDateObject.toString();
                    LocalDate prepDate = LocalDate.parse(prepDateString);
                    
                    // Comparar con la fecha proporcionada
                    return prepDate.isEqual(date);
                })
                .collect(Collectors.toList());
    }
    
        
    @GetMapping("/getUserTopics")
    public ResponseEntity<String> getUserTopics(@RequestParam("user") String user) {
        try {
            MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(dataBaseURL))
                .uuidRepresentation(UuidRepresentation.STANDARD)
                .build();
            
            try (MongoClient mongoClient = MongoClients.create(settings)) {
                MongoDatabase database = mongoClient.getDatabase("Naptar");
                MongoCollection<Document> collection = database.getCollection("Users");
                
                Document userDoc = collection.find(eq("username", user)).first();
                
                if (userDoc != null) {
                    List<Document> topics = userDoc.getList("topics", Document.class);
                    
                    if (topics != null && !topics.isEmpty()) {
                        // Convertimos la lista de documentos a formato JSON
                        String topicsJson = new Gson().toJson(topics);
                        
                        return new ResponseEntity<>(topicsJson, HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>("Error: Topics not found", HttpStatus.NOT_FOUND);
                    }
                } else {
                    return new ResponseEntity<>("Error: User not found", HttpStatus.NOT_FOUND);
                }
            }
        } catch (Exception e) {
            System.err.println("Error creating MongoDB client: " + e);
            return new ResponseEntity<>("Error: Failed to create MongoDB client", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/saveTopics")
    public ResponseEntity<String> saveTopics(@RequestBody List<Topic> topics) {
        try {
            MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(dataBaseURL))
                .build();
    
            try (MongoClient mongoClient = MongoClients.create(settings)) {
                MongoDatabase database = mongoClient.getDatabase("Naptar");
                MongoCollection<Document> collection = database.getCollection("Users");
    
                // Convertir la lista de topics a una lista de documentos MongoDB
                List<Document> topicDocuments = topics.stream()
                    .map(topic -> new Document("name", topic.getName())
                                     .append("priority", topic.getPriority()))
                    .collect(Collectors.toList());
    
                // Actualizar el documento del usuario con la nueva lista de topics
                UpdateResult updateResult = collection.updateOne(
                    Filters.eq("username", "hugo.blazquez"),
                    new Document("$set", new Document("topics", topicDocuments))
                );
    
                if (updateResult.getModifiedCount() > 0) {
                    // Los topics se actualizaron correctamente
                    return new ResponseEntity<>("Topics updated successfully for user: hugo.blazquez", HttpStatus.OK);
                } else {
                    // No se pudo encontrar al usuario
                    return new ResponseEntity<>("Error: User not found", HttpStatus.NOT_FOUND);
                }
            }
        } catch (Exception e) {
            System.err.println("Error creating MongoDB client: " + e);
            return new ResponseEntity<>("Error: Failed to create MongoDB client", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    

    @PostMapping("/saveConfig")
    public ResponseEntity<String> saveConfig(
            @RequestParam("user") String user,
            @RequestParam("activated") String activated,
            @RequestParam("sHour") String sHour,
            @RequestParam("eHour") String eHour,
            @RequestParam("nBreaks") String nBreaks,
            @RequestParam("ET1") String ET1,
            @RequestParam("ET2") String ET2,
            @RequestParam("ET3") String ET3
    ) {

        try {
            // Configurar la representación de UUID
            MongoClientSettings settings = MongoClientSettings.builder()
                    .applyConnectionString(new ConnectionString(dataBaseURL))
                    .uuidRepresentation(UuidRepresentation.STANDARD)
                    .build();

            // Crear el cliente de MongoDB
            try (MongoClient mongoClient = MongoClients.create(settings)) {

                MongoDatabase database = mongoClient.getDatabase("Naptar");
                MongoCollection<Document> collection = database.getCollection("Users");

                if (activated != null && sHour != null && eHour != null&& nBreaks != null&& ET1 != null&& ET2 != null && ET3 != null) {

                    // Crear el nuevo evento como un documento
                    Document configuration = new Document("activated", activated)
                    .append("sHour", sHour)
                    .append("eHour", eHour)
                    .append("nBreaks", nBreaks)
                    .append("ET1", ET1)
                    .append("ET2", ET2)
                    .append("ET3", ET3)
                    ;


                    

                    UpdateResult updateResult = collection.updateOne(
                        eq("username", user),
                        set("configuration", configuration)
                );


                    if (updateResult.getModifiedCount() > 0 ) {
                        // El evento y las preparaciones se añadieron correctamente
                        return new ResponseEntity<>("Event and preparations added successfully to user: " + user, HttpStatus.valueOf(200));
                    } else {
                        // No se pudo encontrar al usuario
                        return new ResponseEntity<>("Error: User not found", HttpStatus.NOT_FOUND);
                    }
                
                }
                return new ResponseEntity<>("Empty Values", HttpStatus.NOT_FOUND);

            }
        } catch (Exception e) {
            System.err.println("Error creating MongoDB client: " + e);
            return new ResponseEntity<>("Error: Failed to create MongoDB client", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getUserConfig")
    public ResponseEntity<String> getUserConfig(
            @RequestParam("user") String user
    ) {
        try {
            // Configurar la representación de UUID
            MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(dataBaseURL))
                .uuidRepresentation(UuidRepresentation.STANDARD)
                .build();
            
            // Crear el cliente de MongoDB
            try (MongoClient mongoClient = MongoClients.create(settings)) {
                MongoDatabase database = mongoClient.getDatabase("Naptar");
                MongoCollection<Document> collection = database.getCollection("Users");
                
                // Obtener el documento del usuario
                Document userDoc = collection.find(eq("username", user)).first();
                
                    if (userDoc != null) {
                        // Usuario encontrado, obtener la lista de eventos

                        Document configuration = userDoc.get("configuration", Document.class);
                        if (configuration != null ) {
                            // Convertir la lista de eventos a formato JSON
                           String configurationJson = new Gson().toJson(configuration);
                           
                           return new ResponseEntity<>(configurationJson, HttpStatus.OK);
                       }
                        else{
                            
                            return new ResponseEntity<>("Error: Configuration not found", HttpStatus.NOT_FOUND);
                        }
                    } 
                    else 
                    {
                        // No se pudo encontrar al usuario
                        return new ResponseEntity<>("Error: User not found", HttpStatus.NOT_FOUND);
                    }
                
               

            }
        } catch (Exception e) {
            System.err.println("Error creating MongoDB client: " + e);
            return new ResponseEntity<>("Error: Failed to create MongoDB client", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}

