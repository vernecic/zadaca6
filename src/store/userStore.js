import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    registriraniKorisnici: [],
    trenutniKorisnik: null,
  }),
  actions: {
    registracija(korisnik) {
      const emailPostoji = this.registriraniKorisnici.find((x) => {
        return x.email === korisnik.email;
      });

      if (emailPostoji) {
        throw new Error("Ovaj e-mail je već registriran.");
      }
      const usernamePostoji = this.registriraniKorisnici.find((x) => {
        return x.username === korisnik.username;
      });

      if (usernamePostoji) {
        throw new Error("Ovaj username je već registriran.");
      }

      this.registriraniKorisnici.push(korisnik);
      this.trenutniKorisnik = korisnik;
    },
    prijava(email, password) {
      const korisnik = this.registriraniKorisnici.find((x) => {
        return x.email === email;
      });

      if (!korisnik || korisnik.password !== password) {
        throw new Error("Email ili password su netočni!");
      }
      this.trenutniKorisnik = korisnik;
      return korisnik;
    },
    signOut() {
      this.trenutniKorisnik = null;
    },
    promjenaLozinke(email, password, novaLozinka, confirmNovaLozinka) {
      if (email !== this.trenutniKorisnik.email) {
        throw new Error("Email ne odgovara trenutnom korisniku!");
      }
      if (novaLozinka !== confirmNovaLozinka) {
        throw new Error("Lozinke se ne podudaraju!");
      }
      if (novaLozinka === password) {
        throw new Error("Nova lozinka ne smije biti ista kao stara!");
      }
      if (password !== this.trenutniKorisnik.password) {
        throw new Error("Trenutna lozinka nije točna!");
      }
      const korisnik = this.registriraniKorisnici.find((x) => {
        return x.email === this.trenutniKorisnik.email;
      });
      if (!korisnik) {
        throw new Error("Korisnik ne postoji.");
      }

      korisnik.password = novaLozinka;
      this.trenutniKorisnik.password = novaLozinka;
    },
    brisanjeKorisnika(password) {
      if (password !== this.trenutniKorisnik.password) {
        throw new Error("Lozinka nije ispravna!");
      }

      this.registriraniKorisnici = this.registriraniKorisnici.filter(
        (korisnik) => korisnik.email !== this.trenutniKorisnik.email
      );

      this.trenutniKorisnik = null;
    },
  },
  persist: true,
});
