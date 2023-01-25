Quokka is a social media application that lets users create memories and foster relationships. It allows users to create and share posts with rich text, location data, and images. 

* [Live Link](https://quokka-yq9w.onrender.com/)
* [Original Figma Wireframes](https://www.figma.com/file/ybB5SxBFIVSSNR7wg5lafF/Wireframes?node-id=0%3A1&t=OjEqmlRYclixKcIY-1)
* [Postman API Endpoints](https://www.postman.com/getquokka)

## WYSIWYG Rich Text Editor

<img width="812" alt="image" src="https://user-images.githubusercontent.com/14003649/213982147-b59b6ff1-78d0-41f4-9992-ddecfae293e6.png">

Allowing users to fully express themselves through their writing requires formatted text, so we implemented Quill -- a WYSIWYG rich text editor. Under the hood, it uses html to allow users to bold and italicize text, create list items, and create headers.  We had to parse the HTML data securely and consider how to handle the broader implications of user-styled content when writing our own CSS. 

```
.parent-class descendant {
  property: value;
}
```

Styling intended for a parent class, such as in our PostIndexItem component, could trickle down to user-formatted content, potentially causing discrepancies in how the content was presented. Furthermore, user applied formatting appearing at all in certain places could be problematic, allowing some users to make the content they had written appear unduly large by using header tags. By requiring a short plaintext description of each post to be used for the preview, we were able to improve user experience by making content appear in a more consistent way. 

## Location Data

<img width="1011" alt="image" src="https://user-images.githubusercontent.com/14003649/213982340-b89cdda0-f2f9-4bdd-8f9e-4bed7623e732.png">

A pin on a map is a bold declaration that 'I was here!' Memories and locations are tied inextricably together, so we decided that every post would require a location be selected on a map to be created. Geographic data, represented as a positional array of longitude and latitude, was created at the same time as the post by a user selecting a map. We then display a single pin on a map for a single post, and an array of pins on a user's profile, creating a visual representation of everywhere they've created strong and lasting memories. 

In order to display the pins, we utilized the React version of Google Maps API (react-google-maps). This API requires a user's latitude and longitude to display the pin in the correct location. Understanding that the user would likely know their positional location on a map rather than their exact latitude and longitude, we implemented a clickable map feature. When a user selects their location on the map, that location's latitude and longitude become stored in the database and the pin can thus be correctly displayed on all their posts. 

On the home page, all pins are displayed together on an enlarged map that serves to visually portray the wide variety of locations from where posts have been written. These pins each serve as a link to the original post from that location to allow easy access between the large map and each individual post.
