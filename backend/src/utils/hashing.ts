// Define credential structure
interface Credentials {
    hash: string;
    salt: string;
  }
  
  // Define request body structure
  interface AuthRequest {
    username: string;
    password: string;
  }
  
  // Convert Uint8Array to base64 string
  function uint8ArrayToBase64(buffer: Uint8Array): string {
    return btoa(String.fromCharCode(...buffer));
  }
  
  // Convert base64 string to Uint8Array
  function base64ToUint8Array(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
  
  // Hash password using Cloudflare's Web Crypto API
  export async function hashPassword(
    password: string,
    salt: Uint8Array = crypto.getRandomValues(new Uint8Array(16))
  ): Promise<Credentials> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
  
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
      ),
      256
    );
  
    return {
      salt: uint8ArrayToBase64(salt),
      hash: uint8ArrayToBase64(new Uint8Array(derivedBits))
    };
  }
  
  // Verify password
  export async function verifyPassword(
    password: string,
    storedHash: string,
    storedSalt: string
  ): Promise<boolean> {
    const saltBuffer = base64ToUint8Array(storedSalt);
    const { hash } = await hashPassword(password, saltBuffer);
    return hash === storedHash;
  }