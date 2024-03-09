#include<bits/stdc++.h>
using namespace std;

int mul(int num) {
    

    num = num + num;

    return num;
}


int main() {

    int a = 5;

    int ans = mul(a);

    cout << ans << endl;

    return 0;
}