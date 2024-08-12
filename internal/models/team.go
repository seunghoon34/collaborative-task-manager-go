package models

import "gorm.io/gorm"

type Team struct {
	gorm.Model
	Name     string `json:"name"`
	OwnerID  uint   `json:"owner_id"`
	Users    []User `gorm:"many2many:team_users;"`
	JoinCode string `json:"join_code" gorm:"unique"`
}
