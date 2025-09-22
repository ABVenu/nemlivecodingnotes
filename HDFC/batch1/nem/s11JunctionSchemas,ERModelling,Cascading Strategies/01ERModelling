#### Mongoose Design Patterns: ER Modeling, Junction Schemas 

### **ER Diagrams**

#### 1.1 **Need of Visulization, Documentation of Relationships**

- Relationship design means not only directly refelcting in Schemas, or else we cannot get the type of relationship being implemenated, which field and how it is connected.
- First schema (Entity) will be decided then fields (attributes) are decided and finally relationship is decided
- So, to effectively visulize all these things, we need to create an diagram which is helping to see all the schemas that are getting
- also these diagrams helps to document, which helps is future as well,
- The following are the benefits of using ER Diagrams

  1.  **Visualize your Data Model**:

      - Makes it easier to understand what collections you have and how they relate.
      - Shows which fields are embedded vs. referenced.

  2.  **Design before Implementation**:

      - You can plan your schemas and relationships clearly before coding.
      - Helpful when deciding between **embedding vs. referencing**.

  3.  **Onboarding New Developers**:

      - A clear diagram makes it easy for others to understand your DB design.

  4.  **Debugging and Refactoring**:
      - Spot unoptimized relationships or circular references early.

  ***

#### **What Problems Do ER Diagrams Solve?**

| Problem                    | How ER Diagrams Helps                                             |
| -------------------------- | ----------------------------------------------------------------- |
| Unclear data relationships | Clarify how collections reference or embed one another            |
| Schema complexity          | Break down large, nested schemas into understandable visual units |
| Poor database performance  | Helps you rethink data modeling (e.g., when to normalize)         |
| Collaboration challenges   | Acts as a communication tool between devs, PMs, designers         |

#### 1.2 **How to draw ER Diagrams - basic rules**
#### Activity: Identify the relationship 

![Identify the Relationship](https://coding-platform.s3.amazonaws.com/dev/lms/tickets/a50e879c-ab4f-421e-abc6-e8c7831dd5dd/REVmMPism2dB2efH.png)

##### Method 1 using shapes

1. **Entities (Models)**

   - Drawn as rectangles.
   - Use **singular** names like `User`, `Course`, `Pet`.
   - Attributes (schema fields) are shown as ovals connected to the entity.

2. **Relationships**

   - Represented by diamonds.
   - Connect related entities with lines.
   - Name the relationship with a **verb** (e.g., `has`, `belongsTo`, `enrolled`).

3. **Primary Key**
   - Every Mongoose model has a default `_id` as the primary key.
   - Underline `_id` in the diagram to indicate it's the unique identifier.

![One to Many](https://coding-platform.s3.amazonaws.com/dev/lms/tickets/d286045e-dda9-44f1-a523-0945b0cee034/rmuqXh0PtUitQjiS.png)

##### Method 2 using box and arrows

- Here box is put for a model and all the attributes are listed in the box starting from `_id` and `arrows` are used to connect one box with another which represents relationship

- This method is generally used by developers

![Relationship Denotion](https://coding-platform.s3.amazonaws.com/dev/lms/tickets/92d4f443-10fd-436c-a673-483b9127806d/BzvBb2aKCOqtZ2yI.png)

![One To Many Relationship](https://coding-platform.s3.amazonaws.com/dev/lms/tickets/b528c297-9079-4eb0-93a7-1963e2905e75/Kk3PLTBNKzJFtdIq.png)

#### 1.3 **Implementation of typical ER Diagrams**

- Implement Both Method 1 and Method 2 and explain neatly

---

