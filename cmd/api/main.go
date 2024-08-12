package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/seunghoon34/todo-app-go/internal/database"
	"github.com/seunghoon34/todo-app-go/internal/models"
	"github.com/seunghoon34/todo-app-go/internal/routes"
)

func main() {
	// Initialize database
	database.InitDB()

	// Migrate the schema
	database.DB.AutoMigrate(&models.User{}, &models.Todo{})

	// Create a new Gin router
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowCredentials = true
	r.Use(cors.New(config))

	// Setup routes
	routes.SetupRoutes(r)

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	// Start the server
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
