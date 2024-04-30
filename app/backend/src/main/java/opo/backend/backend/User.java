package opo.backend.backend;

public class User {
    
    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;

    // Constructor
    public User(String firstName, String lastName, String username, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Getters y setters
    // También puedes agregar otros métodos según sea necesario
}
