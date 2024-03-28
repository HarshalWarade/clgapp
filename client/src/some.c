#include <stdio.h>
#include <stdlib.h>
struct Node {
    int data;
    struct Node* next;
};

struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed.\n");
        exit(1);
    }
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}


void insert(struct Node** head, int data) {
    struct Node* newNode = createNode(data);
    newNode->next = *head;
    *head = newNode;
}


void deleteNode(struct Node** head, int data) {
    if (*head == NULL)    {
        printf("List is empty.\n");
        return;
    }
    struct Node* temp = *head;
    struct Node* prev = NULL;
    while (temp != NULL && temp->data != data)    {
        prev = temp;
        temp = temp->next;
    }
    if (temp == NULL) {
        printf("Element not found.\n");
        return;
    }
    if (prev == NULL) {
        *head = temp->next;
    } else {
        prev->next = temp->next;
    }
    free(temp);
}

void search(struct Node* head, int data) {
    struct Node* current = head;
    while (current != NULL) {
        if (current->data == data) {
            printf("Element found.\n");
            return;
        }
        current = current->next;
    }
    printf("Element not found.\n");
}

void printList(struct Node* head) {
    struct Node* current = head;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\n");
}
void freeList(struct Node* head) {
    struct Node* temp;
    while (head != NULL) {
        temp = head;
        head = head->next;
        free(temp);
    }
}
int main() {
    struct Node* head = NULL;
    int choice, data;
    while (1) {
        printf("\nLinked List Operations:\n");
        printf("1. Insert\n");
        printf("2. Delete\n");
        printf("3. Search\n");
        printf("4. Print\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter data to insert: ");
                scanf("%d", &data);
                insert(&head, data);
                break;
            case 2:
                printf("Enter data to delete: ");
                scanf("%d", &data);
                deleteNode(&head, data);
                break;
            case 3:
                printf("Enter data to search: ");
                scanf("%d", &data);
                search(head, data);
                break;
            case 4:
                printf("Linked List: ");
                printList(head);
                break;
            case 5:
                freeList(head);
                printf("Program exited.\n");
                return 0;
            default:
                printf("Invalid choice\n");
        }
    }
}


















// OUTPUT:
// Linked List Operations:
// 1. Insert
// 2. Delete
// 3. Search
// 4. Print
// 5. Exit
// Enter your choice: 1
// Enter data to insert: 77

// Linked List Operations:
// 1. Insert
// 2. Delete
// 3. Search
// 4. Print
// 5. Exit
// Enter your choice: 1
// Enter data to insert: 33

// Linked List Operations:
// 1. Insert
// 2. Delete
// 3. Search
// 4. Print
// 5. Exit
// Enter your choice: 1
// Enter data to insert: 99

// Linked List Operations:
// 1. Insert
// 2. Delete
// 3. Search
// 4. Print
// 5. Exit
// Enter your choice: 4
// Linked List: 99 -> 33 -> 77 -> NULL

// Linked List Operations:
// 1. Insert
// 2. Delete
// 3. Search
// 4. Print
// 5. Exit
// Enter your choice: 3
// Enter data to search: 66
// Element not found.

// Linked List Operations:
// 1. Insert
// 2. Delete
// 3. Search
// 4. Print
// 5. Exit
// Enter your choice: 3
// Enter data to search: 77
// Element found.

// Linked List Operations:
// 1. Insert
// 2. Delete
// 3. Search
// 4. Print
// 5. Exit
// Enter your choice: 2
// Enter data to delete: 33

// Linked List Operations:
// 1. Insert
// 2. Delete
// 3. Search
// 4. Print
// 5. Exit
// Enter your choice: 4
// Linked List: 99 -> 77 -> NULL

// Linked List Operations:
// 1. Insert
// 2. Delete
// 3. Search
// 4. Print
// 5. Exit
// Enter your choice:
