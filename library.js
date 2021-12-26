class RSA{
    static generateKey(p, q){
        var phi = (p - 1) * (q - 1)
        var e = 2
        var d = p*q
        
        while(this.gcd(phi, e) != 1){
            e += 1
        }
        
        while((d * e) % phi != 1){
            d += 1
        }

        return {
            p: p,
            q: q,
            n: p*q,
            e: e,
            d: d
        }
    }

    static encrypt(message, e, n){
        var asciiStr = message.split("").map(elm => {
            return elm.codePointAt(0)
        })

        var res = asciiStr.map(elm =>{
            return this.ModularExponentiation(elm, e, n)
        })

        return res.join(" ")
    }

    static decrypt(message, d, n){
        var decrypt = message.split(" ").map(elm => {
            return this.ModularExponentiation(parseInt(elm), d, n)
        })

        var res = decrypt.map(elm =>{
            return String.fromCodePoint(elm)
        })

        return res.join("")
    }

    static gcd(a, h){
        var temp
        while(true){
            temp = a%h
            if(temp == 0){
                return h
            }
            a = h
            h = temp
        }
    }
  

    static ModularExponentiation(a, b, n){
        a = a % n
        var res = 1
        var x = a
      
        while(b > 0){
            var least = b % 2
            b = Math.floor(b/2)

            if(least == 1){
                res = res * x
                res = res % n
            }

            x = x * x
            x = x % n
        }

        return res;
    }
}
