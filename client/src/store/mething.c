#include <stdio.h>
#include <stdbool.h>
#include <string.h>

bool validate(char* inp) {
    if(strlen(inp) == 1 && (inp[0] == 'a' || inp[0] == 'b')) {
        return true;
    } else if (strlen(inp) == 1) {
        return false;
    }
    if(strlen(inp) == 2 && (inp[0] == 'a' && inp[1] == 'b')) {
        return true;
    } else if (strlen(inp) == 2) {
        return false;
    }
    if(strlen(inp) == 3 && (inp[0] == 'a' && inp[1] == 'b' && inp[2] == 'b')) {
        return true;
    }
    int count = 0;
    for(int i = 0; i < strlen(inp); i++) {
        if(inp[i] == 'b') {
            count++;
        }
    }
    if(count == strlen(inp)) {
        return true;
    }
    count = 0;
    for(int i = 0; i < strlen(inp); i++) {
        if(inp[i] == 'a') {
            count++;
        }
    }
    if(count == strlen(inp)) {
        return false;
    }
    count = 0;
    bool done = false;
    for(int i = 0; i < strlen(inp); i++) {
        if(inp[i] == 'b') {
            done = true;
        }
        if(done && inp[i] == 'a') {
            return false;
        }
    }
    return true;
}

int main() {
    int k = 30;
    while(k--) {
        char inp[100];
        printf("Enter a string: ");
        scanf("%s", inp);
        bool check = validate(inp);
        if(check) {
            printf("Accepted\n");
        } else {
            printf("Rejected\n");
        }
    }
    return 0;
}