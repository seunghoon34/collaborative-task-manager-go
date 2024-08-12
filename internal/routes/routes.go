package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/seunghoon34/todo-app-go/internal/auth"
	"github.com/seunghoon34/todo-app-go/internal/handlers"
)

func SetupRoutes(r *gin.Engine) {
	// Setup CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // Adjust this based on your frontend URL
	r.Use(cors.New(config))

	// Public routes
	r.POST("/signup", handlers.SignUp)
	r.POST("/signin", handlers.SignIn)

	// Protected routes
	protected := r.Group("/")
	protected.Use(auth.AuthMiddleware())
	{
		protected.GET("/todos", handlers.GetTodos)
		protected.POST("/todos", handlers.CreateTodo)
		protected.PUT("/todos/:id", handlers.UpdateTodo)
		protected.DELETE("/todos/:id", handlers.DeleteTodo)
		protected.POST("/teams", handlers.CreateTeam)
		protected.POST("/teams/join/:joinCode", handlers.JoinTeam)
		protected.GET("/teams/:id", handlers.GetTeam)
		protected.GET("/teams", handlers.ListUserTeams)
	}

	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{
			"error":  "Route not found",
			"method": c.Request.Method,
			"path":   c.Request.URL.Path,
		})
	})
}
