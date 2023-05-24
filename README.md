# MAIN_PROJECT


An application that helps a user with lifestyle disease to control the food that he/she consumes.Diabetics is the disease that we have added for the initial version
of this application. Initially this app collects the required user data. If the food is raw, he/she can scan the item or if it is a packet item ,he/she can scan the
backside of the packet that contains the nutrition. The result will show the resulting diabetic level once he/she consumes the item of specified quantity.
The quantity can be changed by the user. If the user wants to eat cooked food, their is a diet plan the shows the list of food that is specifically filtered for the
specific user based on her/his current health. The user nutrition intake is tracked throughout in this application. There is statistics section to see insights on 
his/her current condition. 
 
This app has great future scope. We have also included option to contact doctors, medicine shop and customer care which has only limited functionalities as of now.
In future we can also incorporate other devices such as smartwatch to keep track of the physical activity of the user.

The application is made using React Native and AWS Amplify. Raw food recognition is using object detection method and Packet item scan uses text recognition method.
AWS Rekognition is used for both this method. Machine Learning model is created in AWS Sagemaker using Python.
