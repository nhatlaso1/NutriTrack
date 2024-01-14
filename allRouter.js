import express from 'express';

import * as admController from './APP/Controller/admController.js';

import * as ingredientController from './APP/Controller/ingredientController.js';
import * as userController from './APP/Controller/userController.js';
import * as foodController from './APP/Controller/foodController.js';
import * as menuController from './APP/Controller/menuController.js';
import * as feedBackController from './APP/Controller/feedBackController.js';
import uploadCloud from './APP/middleware/uploadCloudImg.js';

const router = express.Router();
// admin
/**
 * @swagger
 * tags:
 *   - name: Admin section
 *     description: API endpoints for admin
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 */

/**
 * @swagger
 *  /api/admin/login:
 *    post:
 *      summary: Admin login only
 *      tags:
 *        - Admin section
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  default: "nhatminh00789@gmail.com"  
 *                password:
 *                  type: string
 *                  default: "pass"  
 *      responses:
 *        "200":
 *          description: The detail of admin after login
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Login successful"
 *                  token:
 *                    type: string
 *                    example: "your_access_token"
 *        "404":
 *          description: Admin not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Admin not found"
 */

/**
 * @swagger
 *  /api/admin/retrieve/user/list:
 *    get:
 *      summary: Retrieve list of users
 *      tags:
 *        - Admin section
 *      security:
 *        - BearerAuth: [Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5oYXRtaW5oMDA3ODlAZ21haWwuY29tIiwiaWF0IjoxNzA1MjE2MjkyLCJleHAiOjE3MDc4MDgyOTJ9.Mb1DfsqKEw9eZ69k_EWBn_IQObNdtK-TtfFNMa4IP4w] 
 *      responses:
 *        "200":
 *          description: List of users retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                    
 *        "404":
 *          description: No users found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "No users found"
 */

/**
 * @swagger
 *  /api/admin/user/status:
 *    put:
 *      summary: Update user status
 *      tags:
 *        - Admin section
 *      security:
 *        - BearerAuth: []  
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: string
 *                  description: The unique identifier for the user
 *                  example: "9f5c1882-b1df-4162-a7cd-1df573ea9eb7"
 *                status:
 *                  type: integer
 *                  description: The new status for the user (0 or 1, for example)
 *      responses:
 *        "200":
 *          description: User status updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User status updated successfully"
 *        "404":
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User not found"
 */
/**
 * @swagger
 *  /api/admin/user/role:
 *    put:
 *      summary: Update user role
 *      tags:
 *        - Admin section
 *      security:
 *        - BearerAuth: []  
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                  type: string
 *                  description: The unique identifier for the user
 *                  example: "9f5c1882-b1df-4162-a7cd-1df573ea9eb7"
 *                role_name:
 *                  type: string
 *                  description: The new role for the user
 *                  example: "USER"
 *      responses:
 *        "200":
 *          description: User role updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User role updated successfully"
 *        "404":
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User not found"
 */

/**
 * @swagger
 *  /api/admin/{userId}:
 *    delete:
 *      summary: Delete user by ID
 *      tags:
 *        - Admin section
 *      security:
 *        - BearerAuth: [] 
 *      parameters:
 *        - name: userId
 *          in: path
 *          required: true
 *          description: The unique identifier for the user
 *          schema:
 *            type: string
 *            example: "0d6a1485-31e7-4486-bc97-0ebde4f684dc"
 *      responses:
 *        "204":
 *          description: User deleted successfully
 *        "404":
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User not found"
 */
router.post('/api/admin/login', admController.loginAdmin);
router.get('/api/admin/retrieve/user/list', admController.getUserList);
router.put('/api/admin/user/status', admController.updateUserStatus);
router.put('/api/admin/user/role', admController.updateUserRole);
router.delete('/api/admin/:userId', admController.deleteUser);

// user
/**
 * @swagger
 * tags:
 *   - name: User section
 *     description: API endpoints for user
 */

/**
 * @swagger
 *  /api/user/login:
 *    post:
 *      summary: User login
 *      tags:
 *        - User section
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: "johndoe@gmail.com"
 *                password:
 *                  type: string
 *                  example: "pass"
 *      responses:
 *        "200":
 *          description: User logged in successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Login successful"
 *                  token:
 *                    type: string
 *                    example: "user_access_token"
 *        "401":
 *          description: Invalid credentials
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Invalid credentials"
 */

/**
 * @swagger
 *  /api/user/{userId}:
 *    get:
 *      summary: Get user details by ID
 *      tags:
 *        - User section
 *      security:
 *        - BearerAuth: []  
 *      parameters:
 *        - name: userId
 *          in: path
 *          required: true
 *          description: The unique identifier for the user
 *          schema:
 *            type: string
 *            example: "9f5c1882-b1df-4162-a7cd-1df573ea9eb7"
 *      responses:
 *        "200":
 *          description: User details retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  userId:
 *                    type: string
 *                    description: The unique identifier for the user
 *                    example: "9f5c1882-b1df-4162-a7cd-1df573ea9eb7"
 *        "404":
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User not found"
 */

/**
 * @swagger
 *  /api/user/register:
 *    post:
 *      summary: Register a new user
 *      tags:
 *        - User section
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_full_name:
 *                  type: string
 *                  example: "jane doe 2"
 *                user_photo:
 *                  type: null
 *                  example: null
 *                email:
 *                  type: string
 *                  example: "janedoe2@gmail.com"
 *                password:
 *                  type: string
 *                  example: "pass"
 *                sex:
 *                  type: string
 *                  example: "female"
 *                birthday:
 *                  type: string
 *                  format: date-time
 *                  example: "2009-09-08T17:00:00.000Z"
 *                phone_number:
 *                  type: string
 *                  example: "123456789"
 *                status:
 *                  type: boolean
 *                  example: true
 *                role_name:
 *                  type: string
 *                  example: "USER"
 *      responses:
 *        "201":
 *          description: User registered successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User registered successfully"
 *        "400":
 *          description: Bad request, invalid input data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Invalid input data"
 *        "404":
 *          description: Conflict, user email already exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User email already exists"
 */

/**
 * @swagger
 *  /api/user/update/{userId}:
 *    put:
 *      summary: Update user details by ID
 *      tags:
 *        - User section
 *      security:
 *        - BearerAuth: []  
 *      parameters:
 *        - name: userId
 *          in: path
 *          required: true
 *          description: The unique identifier for the user
 *          schema:
 *            type: string
 *            example: "9f5c1882-b1df-4162-a7cd-1df573ea9eb7"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_full_name:
 *                  type: string
 *                  example: "Jane Doe v3"
 *                user_photo:
 *                  type: null
 *                  example: null
 *                sex:
 *                  type: string
 *                  example: "MALE"
 *                birthday:
 *                  type: null
 *                  example: null
 *                phone_number:
 *                  type: null
 *                  example: null
 *                status:
 *                  type: boolean
 *                  example: false
 *      responses:
 *        "200":
 *          description: User details updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User details updated successfully"
 *        "404":
 *          description: User not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User not found"
 */
router.post('/api/user/login', userController.loginUser);
router.get('/api/user/:userId', userController.getUserDetails);
router.post('/api/user/register', userController.registerUser);
router.put('/api/user/update/:userId', userController.updateUserDetails);
router.post('/api/user/info/:userId', userController.createUserInfo);
router.put('/api/user/info/:userId', userController.updateUserInfo);
router.put(
  '/api/user/avatar/:userId',
  uploadCloud.single('image'),
  userController.updateUserAvatar,
);
router.post(
  '/api/user/food/feed-back/:foodId',
  userController.createFoodFeedback,
);
router.post(
  '/api/user/menu/feed-back/:menuId',
  userController.createMenuFeedback,
);

// ingredient
/**
 * @swagger
 * tags:
 *   - name: Ingredient section
 *     description: API endpoints for ingredient
 */

/**
 * @swagger
 *  /api/ingredient:
 *    get:
 *      summary: Get list of ingredients
 *      tags:
 *        - Ingredient section
 *      responses:
 *        "200":
 *          description: List of ingredients retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *        "404":
 *          description: No ingredients found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "No ingredients found"
 */

/**
 * @swagger
 *  /api/ingredient:
 *    post:
 *      summary: Create a new ingredient
 *      tags:
 *        - Ingredient section
 *      security:
 *        - BearerAuth: []  
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ingredient_name:
 *                  type: string
 *                  example: "Blackberry 111"
 *                ingredient_photo:
 *                  type: string
 *                  example: "blackberry.jpg"
 *                ingredient_category_name:
 *                  type: string
 *                  example: "Vegetables"
 *      responses:
 *        "201":
 *          description: Ingredient created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Ingredient created successfully"
 *        "400":
 *          description: Bad request, invalid input data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Invalid input data"
 */

/**
 * @swagger
 *  /api/ingredient/{ingredientId}:
 *    get:
 *      summary: Get ingredient details by ID
 *      tags:
 *        - Ingredient section
 *      security:
 *        - BearerAuth: [] 
 *      parameters:
 *        - name: ingredientId
 *          in: path
 *          required: true
 *          description: The unique identifier for the ingredient
 *          schema:
 *            type: string
 *            example: "8e7aa546-cb2a-448f-9a53-806869a35282"
 *      responses:
 *        "200":
 *          description: Ingredient details retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *        "404":
 *          description: Ingredient not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Ingredient not found"
 */

/**
 * @swagger
 *  /api/ingredient/{ingredientId}:
 *    put:
 *      summary: Update ingredient details by ID
 *      tags:
 *        - Ingredient section
 *      security:
 *        - BearerAuth: []  # Use the Bearer token for authentication
 *      parameters:
 *        - name: ingredientId
 *          in: path
 *          required: true
 *          description: The unique identifier for the ingredient
 *          schema:
 *            type: string
 *            example: "123456"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ingredient_name:
 *                  type: string
 *                  example: "Blueberry"
 *                ingredient_photo:
 *                  type: string
 *                  example: "blueberry.jpg"
 *                ingredient_category_name:
 *                  type: string
 *                  example: "Fruit"
 *      responses:
 *        "200":
 *          description: Ingredient details updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Ingredient details updated successfully"
 *        "404":
 *          description: Ingredient not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Ingredient not found"
 */
router.get('/api/ingredient', ingredientController.getIngredientList);
router.post('/api/ingredient', ingredientController.createNewIngredient);
router.get(
  '/api/ingredient/:ingredientId',
  ingredientController.getIngredientById,
);
router.put(
  '/api/ingredient/:ingredientId',
  ingredientController.updateIngredient,
);
router.delete(
  '/api/ingredient/:ingredientId',
  ingredientController.deleteIngredient,
);
router.put(
  '/api/ingredient/avatar/:ingredientId',
  uploadCloud.single('image'),
  ingredientController.updateIngredientAvatar,
);

// food
/**
 * @swagger
 * tags:
 *   - name: Food section
 *     description: API endpoints for food
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 */

/**
 * @swagger
 *  /api/food:
 *    get:
 *      summary: Get list of foods
 *      tags:
 *        - Food section
 *      security:
 *        - BearerAuth: []  # Use the Bearer token for authentication
 *      responses:
 *        "200":
 *          description: List of foods retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    foodId:
 *                      type: string
 *                      description: The unique identifier for the food
 *                      example: "123456"
 *                    foodName:
 *                      type: string
 *                      description: The name of the food
 *                      example: "Pasta"
 *        "404":
 *          description: No foods found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "No foods found"
 */

/**
 * @swagger
 *  /api/food/{foodId}:
 *    get:
 *      summary: Get food details by ID
 *      tags:
 *        - Food section
 *      security:
 *        - BearerAuth: []  # Use the Bearer token for authentication
 *      parameters:
 *        - name: foodId
 *          in: path
 *          required: true
 *          description: The unique identifier for the food
 *          schema:
 *            type: string
 *            example: "0b533bd2-2038-45bb-b268-f5f22655f111"
 *      responses:
 *        "200":
 *          description: Food details retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  foodId:
 *                    type: string
 *                    description: The unique identifier for the food
 *                    example: "0b533bd2-2038-45bb-b268-f5f22655f111"

 *        "404":
 *          description: Food not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Food not found"
 */

/**
 * @swagger
 *  /api/food/{foodId}:
 *    put:
 *      summary: Update food details by ID
 *      tags:
 *        - Food section
 *      security:
 *        - BearerAuth: []  # Use the Bearer token for authentication
 *      parameters:
 *        - name: foodId
 *          in: path
 *          required: true
 *          description: The unique identifier for the food
 *          schema:
 *            type: string
 *            example: "123456"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                food_name:
 *                  type: string
 *                  example: "Fruit Salad"
 *                food_category_name:
 *                  type: string
 *                  example: "Salads"
 *                food_recipes:
 *                  type: string
 *                  example: "Mix various fruits and serve chilled."
 *      responses:
 *        "200":
 *          description: Food details updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Food details updated successfully"
 *        "404":
 *          description: Food not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Food not found"
 */
router.get('/api/food', foodController.getFoodList);
router.post('/api/food', foodController.createFood);
router.get('/api/food/:foodId', foodController.getFoodDetails);
router.put('/api/food/:foodId', foodController.updateFood);
router.delete('/api/food/:foodId', foodController.deleteFood);
router.put(
  '/api/food/avatar/:foodId',
  uploadCloud.single('image'),
  foodController.updateFoodAvatar,
);

// menu
router.get('/api/menu', menuController.getMenuList);
router.post('/api/menu', menuController.createMenu);
router.get('/api/menu/:menuId', menuController.getMenuFoodDetails);
router.put('/api/menu/:menuId', menuController.updateMenu);
router.delete('/api/menu/:menuId', menuController.deleteMenu);
router.put(
  '/api/menu/avatar/:menuId',
  uploadCloud.single('image'),
  menuController.updateMenuAvatar,
);

// feed-back
router.get('/api/feed-back/food/', feedBackController.getFoodFeedBacks);
router.get('/api/feed-back/menu/', feedBackController.getMenuFeedBacks);

router.get(
  '/api/feed-back/food/:foodId',
  feedBackController.getFoodFeedBackByFoodId,
);
router.get(
  '/api/feed-back/menu/:menuId',
  feedBackController.getMenuFeedBackListByMenuId,
);
export default router;
