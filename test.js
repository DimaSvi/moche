const assert = require('assert');
const bcrypt = require('bcrypt');
const { exec } = require('child_process');

describe('Password Prompt and Hashing', function () {
  this.timeout(5000);

  it('should hash the password correctly', async function () {
    const password = 'securePassword123';
    const saltRounds = 10;
    
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    assert.ok(await bcrypt.compare(password, hashedPassword), 'The hashed password does not match the original');
  });

  it('should detect non-matching passwords', async function () {
    const password = 'securePassword123';
    const wrongPassword = 'wrongPassword456';
    const saltRounds = 10;
    
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    assert.ok(!(await bcrypt.compare(wrongPassword, hashedPassword)), 'A wrong password should not match the hashed password');
  });

  it('should execute the script and process password inputs', function (done) {
    exec('node your-script.js', (err, stdout) => {
      if (err) return done(err);
      
      assert.ok(stdout.includes('✅ Passwords match!') || stdout.includes('❌ Passwords do not match!'));
      done();
      console.log('✅ Passwords match!');
      console.log('❌ Passwords do not match!');

    });
  });
});
