/** @type {import('next').NextConfig} */
const nextConfig={
  poweredByHeader:false,
  images:{
    unoptimized:true
  },
  async redirects(){
    return [
      {source:'/websites',destination:'/what-we-automate',permanent:true},
      {source:'/website-audit',destination:'/automation-audit',permanent:true},
      {source:'/automation',destination:'/what-we-automate',permanent:true},
      {source:'/work',destination:'/prototypes',permanent:true},
      {source:'/work/:path*',destination:'/prototypes',permanent:true},
    ]
  },
  async headers(){
    return [{source:'/:path*',headers:[
      {key:'X-Content-Type-Options',value:'nosniff'},
      {key:'X-Frame-Options',value:'DENY'},
      {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
      {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=(), payment=()'},
      {key:'Cross-Origin-Opener-Policy',value:'same-origin'},
      {key:'Strict-Transport-Security',value:'max-age=31536000; includeSubDomains'},
      {key:'Content-Security-Policy',value:"default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; img-src 'self' data: blob: https:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https:; upgrade-insecure-requests"}
    ]}]
  }
}
export default nextConfig
