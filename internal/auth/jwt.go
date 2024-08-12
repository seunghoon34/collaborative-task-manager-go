package auth

import (
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/seunghoon34/todo-app-go/internal/models"
)

var jwtKey = []byte(getJWTKey())

func getJWTKey() string {
	key := os.Getenv("JWT_SECRET")
	if key == "" {
		// Development fallback
		return "your_development_secret_key_12345"
	}
	return key
}

func GenerateToken(user models.User) (string, error) {

	if user.Username == "" {
		return "", errors.New("invalid user: username is empty")
	}

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &jwt.StandardClaims{
		Subject:   user.Username,
		ExpiresAt: expirationTime.Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", errors.New("failed to sign token" + err.Error())
	}

	return tokenString, nil

}

func ValidateToken(tokenString string) (*jwt.StandardClaims, error) {
	if tokenString == "" {
		return nil, errors.New("token is empty")
	}

	claims := &jwt.StandardClaims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtKey, nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrSignatureInvalid) {
			return nil, errors.New("invalid token signature")
		}
		return nil, fmt.Errorf("failed to parse token: %w", err)
	}

	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	if claims.ExpiresAt < time.Now().Unix() {
		return nil, errors.New("token has expired")
	}

	return claims, nil
}
